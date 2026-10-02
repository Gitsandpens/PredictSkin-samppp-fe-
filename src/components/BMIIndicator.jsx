export function calcBmi(p) {
  const h = parseFloat(p.height) / 100, w = parseFloat(p.weight);
  if (!(h > 0) || !(w > 0)) return null;
  const bmi = w / (h * h);
  const category = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obesity range";
  return { bmi, category };
}

export default function BMIIndicator({ profile }) {
  const r = calcBmi(profile);
  if (!r) return <p className="text-sm text-mute">Enter height and weight to see your BMI.</p>;
  const pos = Math.min(Math.max(((r.bmi - 15) / 25) * 100, 0), 100);
  return (
    <div>
      <div className="serif text-3xl">{r.bmi.toFixed(1)} <span className="text-base text-mute">BMI</span></div>
      <div className="font-medium">{r.category}</div>
      <div className="relative mt-3 h-2 bg-sage" aria-hidden="true">
        <span className="absolute top-[-3px] h-4 w-1 bg-brand" style={{ left: `${pos}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-xs text-mute"><span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span></div>
      {Number(profile.age) > 0 && Number(profile.age) < 18 && (
        <p className="mt-2 text-sm text-mute">Adult BMI categories may not apply accurately to children and adolescents.</p>
      )}
      <p className="mt-2 text-xs text-mute">BMI is a screening number only and does not diagnose any condition.</p>
    </div>
  );
}
