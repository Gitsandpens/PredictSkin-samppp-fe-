import { useState } from "react";
import { getNutritionPlan } from "../services/api.js";

const MEALS = [["breakfast", "Breakfast"], ["lunch", "Lunch"], ["snack", "Evening Snack"], ["dinner", "Dinner"]];
const GOALS = { LOSE: "Lose weight", MAINTAIN: "Maintain weight", GAIN: "Gain weight" };
const List = ({ items }) => <ul className="mt-2 list-disc space-y-1 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul>;

export default function NutritionGuide({ profile, onEditProfile }) {
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const complete = Number(profile.age) > 0 && Number(profile.height) > 0 && Number(profile.weight) > 0;

  const generate = async () => {
    setLoading(true); setError("");
    try {
      setPlan(await getNutritionPlan({
        age: Number(profile.age), gender: profile.gender || null, height_cm: Number(profile.height), weight_kg: Number(profile.weight),
        activity: profile.activity, goal: profile.goal, diet: profile.diet, allergies: profile.allergies,
      }));
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  return (
    <section className="border border-line bg-panel p-5 sm:p-7">
      <h2 className="text-2xl font-semibold">Nutrition Guide</h2>
      <p className="mt-1 text-mute">General suggestions based on your goal ({GOALS[profile.goal]}), allergies, age, gender and activity level.</p>
      {!complete && <p className="mt-4">Add your age, height and weight in the <button className="underline" onClick={onEditProfile}>Health Profile</button> first.</p>}
      <button className="btn mt-4" disabled={!complete || loading} onClick={generate}>{loading ? "Generating..." : "Generate nutrition guide"}</button>
      {error && <p role="alert" className="mt-4 border-l-4 border-alert bg-alertbg p-3 text-alert">{error}</p>}

      {plan && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {MEALS.map(([k, label]) => <div key={k}><h3 className="text-lg font-semibold">{label}</h3><List items={plan.sections[k]} /></div>)}
            <div><h3 className="text-lg font-semibold">Hydration</h3><p className="mt-2">{plan.hydration}</p></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div><h3 className="text-lg font-semibold">Foods to Prefer</h3><List items={plan.prefer} /></div>
            <div><h3 className="text-lg font-semibold">Foods to Limit</h3><List items={plan.limit} /></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Nutrition for Skin Health</h3>
            <p className="mt-2 text-mute">{plan.skin_statement}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">{plan.skin.map((s) => <li key={s.food}>{s.food} <span className="text-mute">({s.nutrient})</span></li>)}</ul>
            <p className="mt-2 text-sm text-mute">Food is not a treatment for any skin condition.</p>
          </div>
          <div className="border-t border-line pt-4 text-sm text-mute">{plan.notes.map((n) => <p key={n} className="mb-1">{n}</p>)}</div>
        </div>
      )}
    </section>
  );
}
