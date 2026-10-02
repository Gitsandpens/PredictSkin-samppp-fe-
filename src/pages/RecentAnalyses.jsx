export default function RecentAnalyses({ history, onClear }) {
  return (
    <section className="border border-line bg-panel p-5 sm:p-7">
      <h2 className="text-2xl font-semibold">Recent Analyses</h2>
      <p className="mt-1 text-mute">Kept only in this browser tab. Uploaded images are never saved. Closing the tab clears this list.</p>
      {history.length === 0 ? (
        <p className="mt-5">No analyses yet. Run one from Skin Analysis.</p>
      ) : (
        <>
          <ul className="mt-5 divide-y divide-line border border-line">
            {history.map((h, i) => (
              <li key={h.date} className="p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold">{String(history.length - i).padStart(3, "0")}. {h.uncertain ? `Uncertain (closest: ${h.prediction})` : h.prediction}</span>
                  <span className="text-sm text-mute">{new Date(h.date).toLocaleString()}</span>
                </div>
                <div className="text-sm text-mute">Visual similarity {(h.match_score * 100).toFixed(1)}%</div>
                <div className="mt-1 text-sm">{Object.entries(h.scores).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${(v * 100).toFixed(0)}%`).join(", ")}</div>
              </li>
            ))}
          </ul>
          <button className="btn-ghost mt-4" onClick={onClear}>Clear history</button>
        </>
      )}
    </section>
  );
}
