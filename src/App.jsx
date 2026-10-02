import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import BMIIndicator from "./components/BMIIndicator.jsx";
import HealthProfile from "./components/HealthProfile.jsx";
import NutritionGuide from "./components/NutritionGuide.jsx";
import SkinAnalysis from "./pages/SkinAnalysis.jsx";
import ReferenceDataset from "./pages/ReferenceDataset.jsx";
import RecentAnalyses from "./pages/RecentAnalyses.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import { getMe, getToken, setToken, setUnauthorizedHandler } from "./services/api.js";

const EMPTY = { age: "", gender: "", height: "", weight: "", activity: "Lightly active", goal: "MAINTAIN", diet: "veg", allergies: [] };
const read = (store, key, fallback) => { try { return JSON.parse(store.getItem(key)) ?? fallback; } catch { return fallback; } };
const GOAL = { LOSE: "Lose weight", MAINTAIN: "Maintain weight", GAIN: "Gain weight" };

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(!!getToken());
  const [page, setPage] = useState("analysis");
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("ps-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  const [remember, setRemember] = useState(() => localStorage.getItem("ps-remember") === "1");
  const [profile, setProfile] = useState(() => (localStorage.getItem("ps-remember") === "1" ? read(localStorage, "ps-profile", EMPTY) : EMPTY));
  const [history, setHistory] = useState(() => read(sessionStorage, "ps-history", []));
  const [count, setCount] = useState(() => read(sessionStorage, "ps-history", []).length + 1);

  useEffect(() => {
    setUnauthorizedHandler(() => { setToken(null); setUser(null); });
    if (getToken()) getMe().then(setUser).catch(() => {}).finally(() => setChecking(false));
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("ps-theme", theme); }, [theme]);
  useEffect(() => { sessionStorage.setItem("ps-history", JSON.stringify(history)); }, [history]);
  useEffect(() => {
    localStorage.setItem("ps-remember", remember ? "1" : "0");
    if (remember) localStorage.setItem("ps-profile", JSON.stringify(profile)); else localStorage.removeItem("ps-profile");
  }, [remember, profile]);

  const logout = () => { setToken(null); setUser(null); setHistory([]); setPage("analysis"); };
  if (checking) return <div className="p-8 text-mute">Loading...</div>;
  if (!user) return <Login onAuth={(token, u) => { setToken(token); setUser(u); }} />;

  const go = (p) => { setPage(p); setMenu(false); window.scrollTo(0, 0); };
  // Only prediction, similarity, date and scores are kept (never the image).
  const addResult = (r) => { setHistory((h) => [{ prediction: r.prediction, match_score: r.match_score, uncertain: r.uncertain, scores: r.scores, date: r.date }, ...h].slice(0, 20)); setCount(history.length + 1); };

  const sidebar = <Sidebar page={page} onNavigate={go} theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} user={user} onLogout={logout} />;
  const content = {
    analysis: <SkinAnalysis count={count} onResult={addResult} />,
    profile: <HealthProfile profile={profile} setProfile={setProfile} remember={remember} setRemember={setRemember} />,
    nutrition: <NutritionGuide profile={profile} onEditProfile={() => go("profile")} />,
    recent: <RecentAnalyses history={history} onClear={() => setHistory([])} />,
    dataset: <ReferenceDataset />,
    about: <About />,
  }[page];

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_19rem]">
      <aside className="hidden border-r border-line bg-panel lg:block"><div className="sticky top-0 h-screen">{sidebar}</div></aside>
      <header className="flex items-center justify-between border-b border-line bg-panel px-4 py-3 lg:hidden">
        <span className="serif text-xl font-semibold text-brand">PredictSkin</span>
        <button className="btn-ghost" aria-expanded={menu} onClick={() => setMenu(!menu)}>Menu</button>
      </header>
      {menu && <div className="border-b border-line bg-panel lg:hidden">{sidebar}</div>}
      <main className="min-w-0 p-4 sm:p-8">{content}</main>
      <aside className="hidden border-l border-line bg-panel p-5 xl:block">
        <div className="sticky top-5 space-y-4">
          <h2 className="text-lg font-semibold">Health Profile</h2>
          <BMIIndicator profile={profile} />
          <dl className="space-y-2 text-sm">
            <div><dt className="text-mute">Activity level</dt><dd>{profile.activity}</dd></div>
            <div><dt className="text-mute">Goal</dt><dd>{GOAL[profile.goal]}</dd></div>
            <div><dt className="text-mute">Allergies</dt><dd>{profile.allergies.length ? profile.allergies.join(", ") : "Not set"}</dd></div>
          </dl>
          <button className="btn-ghost" onClick={() => go("profile")}>Edit profile</button>
        </div>
      </aside>
    </div>
  );
}
