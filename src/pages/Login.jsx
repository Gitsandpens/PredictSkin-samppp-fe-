import { useState } from "react";
import { login, signup } from "../services/api.js";
import { DISCLAIMER } from "../data/conditions.js";

export default function Login({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const isLogin = mode === "login";

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const r = isLogin ? await login(form.email, form.password) : await signup(form.name, form.email, form.password);
      onAuth(r.token, r.user);
    } catch (err) { setError(err.message); }
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="serif text-3xl font-semibold text-brand">PredictSkin</div>
        <p className="mb-6 text-sm text-mute">Skin image comparison and nutrition guidance. Educational prototype.</p>
        <form onSubmit={submit} className="border border-line bg-panel p-6">
          <h1 className="text-2xl font-semibold">{isLogin ? "Log in" : "Create account"}</h1>
          <div className="mt-5 space-y-4">
            {!isLogin && <label className="block text-sm">Name<input className="field mt-1" value={form.name} onChange={set("name")} autoComplete="name" required /></label>}
            <label className="block text-sm">Email<input className="field mt-1" type="email" value={form.email} onChange={set("email")} autoComplete="email" required /></label>
            <label className="block text-sm">Password<input className="field mt-1" type="password" minLength={isLogin ? undefined : 8} value={form.password} onChange={set("password")} autoComplete={isLogin ? "current-password" : "new-password"} required />
              {!isLogin && <span className="text-xs text-mute">At least 8 characters.</span>}
            </label>
          </div>
          {error && <p role="alert" className="mt-4 border-l-4 border-alert bg-alertbg p-3 text-sm text-alert">{error}</p>}
          <button className="btn mt-5 w-full" disabled={busy}>{busy ? "Please wait..." : isLogin ? "LOG IN" : "CREATE ACCOUNT"}</button>
          <p className="mt-4 text-sm text-mute">
            {isLogin ? "New here? " : "Already have an account? "}
            <button type="button" className="text-ink underline" onClick={() => { setMode(isLogin ? "signup" : "login"); setError(""); }}>
              {isLogin ? "Create an account" : "Log in"}
            </button>
          </p>
        </form>
        <p className="mt-4 text-xs text-mute">{DISCLAIMER} Only your name, email and a scrambled password are stored. Uploaded images are never saved.</p>
      </div>
    </div>
  );
}
