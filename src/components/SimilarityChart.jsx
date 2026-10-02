export default function SimilarityChart({ scores, top }) {
  const rows = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return (
    <div className="space-y-2" role="list" aria-label="Similarity scores for all seven categories">
      {rows.map(([label, v]) => (
        <div key={label} role="listitem" className="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-3 text-sm sm:grid-cols-[9rem_1fr_4rem]">
          <span className={label === top ? "font-semibold" : ""}>{label}</span>
          <div className="bar"><span className={label === top ? "top" : ""} style={{ width: `${Math.max(v * 100, 0.5)}%` }} /></div>
          <span className="text-right tabular-nums">{(v * 100).toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
}
