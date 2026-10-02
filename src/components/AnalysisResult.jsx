import SimilarityChart from "./SimilarityChart.jsx";
import { ADVICE, CONDITIONS, DISCLAIMER, RESULT_NOTE, UNCERTAIN, WARNINGS } from "../data/conditions.js";

export function buildSummary(r, number) {
  const c = CONDITIONS[r.prediction];
  const lines = [
    "PredictSkin Analysis Summary", `Analysis ${number}`, `Date: ${new Date(r.date || Date.now()).toLocaleString()}`, "",
    r.uncertain ? `Result: Uncertain (closest reference: ${r.prediction})` : `Visual Match: ${r.prediction}`,
    `Visual Similarity: ${(r.match_score * 100).toFixed(1)}%`, "", "All 7 scores:",
    ...Object.entries(r.scores).sort((a, b) => b[1] - a[1]).map(([k, v]) => `  ${k}: ${(v * 100).toFixed(1)}%`), "",
    "Typical visual characteristics:", ...c.traits.map((t) => `  - ${t}`), "", `Recommendation: ${ADVICE}`, "", `Disclaimer: ${DISCLAIMER}`, RESULT_NOTE,
  ];
  return lines.join("\n");
}

function download(r, number) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([buildSummary(r, number)], { type: "text/plain" }));
  a.download = `predictskin-analysis-${number}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function AnalysisResult({ result, number, innerRef, onReset }) {
  const c = CONDITIONS[result.prediction];
  const pct = (result.match_score * 100).toFixed(1);
  const num = String(number).padStart(3, "0");
  return (
    <section ref={innerRef} className="scroll-mt-4 border border-line bg-panel p-5 sm:p-7" aria-live="polite">
      <div className="text-sm text-mute">SKIN ANALYSIS / {num}</div>
      {result.uncertain ? (
        <>
          <h2 className="mt-3 text-3xl font-semibold">UNCERTAIN RESULT</h2>
          <p className="mt-2 max-w-xl">{UNCERTAIN}</p>
          <p className="mt-3 text-mute">Closest reference: {result.prediction} ({pct}% visual similarity)</p>
        </>
      ) : (
        <>
          <div className="mt-3 text-sm font-semibold tracking-wide text-brand">DETECTED VISUAL MATCH</div>
          <h2 className="text-4xl font-semibold sm:text-5xl">{result.prediction.toUpperCase()}</h2>
          <div className="mt-4 text-sm text-mute">Visual similarity</div>
          <div className="serif text-4xl">{pct}%</div>
        </>
      )}

      {WARNINGS[result.prediction] && (
        <div role="alert" className="mt-5 border-l-4 border-alert bg-alertbg p-4 text-alert">{WARNINGS[result.prediction]}</div>
      )}

      <h3 className="mt-7 text-lg font-semibold">Similarity scores</h3>
      <div className="mt-3"><SimilarityChart scores={result.scores} top={result.prediction} /></div>
      <p className="mt-3 text-xs text-mute">Scores are cosine similarities between image embeddings, converted with a softmax so the seven values add up to 100%.</p>

      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">Common visual characteristics</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">{c.traits.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">General information</h3>
          <p className="mt-2">{c.info}</p>
          <h3 className="mt-5 text-lg font-semibold">When to seek professional advice</h3>
          <p className="mt-2">{ADVICE}</p>
        </div>
      </div>

      <p className="mt-7 border-t border-line pt-4 text-sm text-mute"><strong className="text-ink">Important: </strong>{RESULT_NOTE} {DISCLAIMER}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="btn-ghost" onClick={() => download(result, num)}>Download analysis summary</button>
        <button className="btn-ghost" onClick={onReset}>RESET ANALYSIS</button>
      </div>
    </section>
  );
}
