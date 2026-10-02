import BMIIndicator from "./BMIIndicator.jsx";

export const ALLERGIES = ["Milk", "Peanuts", "Eggs", "Gluten", "Seafood", "Tree nuts", "None"];
const Label = ({ children, ...p }) => <label className="block text-sm" {...p}>{children}</label>;

export default function HealthProfile({ profile, setProfile, remember, setRemember }) {
  const set = (k) => (e) => setProfile({ ...profile, [k]: e.target.value });
  const toggle = (a) => {
    if (a === "None") return setProfile({ ...profile, allergies: ["None"] });
    const rest = profile.allergies.filter((x) => x !== "None");
    setProfile({ ...profile, allergies: rest.includes(a) ? rest.filter((x) => x !== a) : [...rest, a] });
  };
  return (
    <section className="border border-line bg-panel p-5 sm:p-7">
      <h2 className="text-2xl font-semibold">Health Profile</h2>
      <p className="mt-1 text-mute">Used only for BMI and the nutrition guide. Nothing is sent to be stored.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Label>Age<input className="field mt-1" type="number" min="1" max="120" value={profile.age} onChange={set("age")} /></Label>
        <Label>Gender
          <select className="field mt-1" value={profile.gender} onChange={set("gender")}>
            <option value="">Select</option><option>Male</option><option>Female</option><option>Other / Prefer not to say</option>
          </select>
        </Label>
        <Label>Height (cm)<input className="field mt-1" type="number" min="50" max="250" value={profile.height} onChange={set("height")} /></Label>
        <Label>Weight (kg)<input className="field mt-1" type="number" min="10" max="400" value={profile.weight} onChange={set("weight")} /></Label>
        <Label>Activity level
          <select className="field mt-1" value={profile.activity} onChange={set("activity")}>
            {["Sedentary", "Lightly active", "Moderately active", "Very active"].map((a) => <option key={a}>{a}</option>)}
          </select>
        </Label>
        <Label>Food preference
          <select className="field mt-1" value={profile.diet} onChange={set("diet")}>
            <option value="veg">Vegetarian</option><option value="egg">Vegetarian with eggs</option><option value="nonveg">Non-vegetarian</option>
          </select>
        </Label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm">Weight goal (your choice)</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {[["LOSE", "Lose weight"], ["MAINTAIN", "Maintain weight"], ["GAIN", "Gain weight"]].map(([v, l]) => (
            <label key={v} className={`cursor-pointer border px-3 py-1.5 ${profile.goal === v ? "border-brand bg-sage font-medium" : "border-line"}`}>
              <input type="radio" name="goal" className="sr-only" checked={profile.goal === v} onChange={() => setProfile({ ...profile, goal: v })} />{l}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-sm">Known allergies</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {ALLERGIES.map((a) => (
            <label key={a} className={`cursor-pointer border px-3 py-1.5 ${profile.allergies.includes(a) ? "border-brand bg-sage font-medium" : "border-line"}`}>
              <input type="checkbox" className="sr-only" checked={profile.allergies.includes(a)} onChange={() => toggle(a)} />{a}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember profile on this browser
      </label>
      <div className="mt-6 border-t border-line pt-4"><BMIIndicator profile={profile} /></div>
    </section>
  );
}
