import { useEffect, useRef, useState } from "react";
import ImageUploader from "../components/ImageUploader.jsx";
import AnalysisResult from "../components/AnalysisResult.jsx";
import { predictSkin } from "../services/api.js";
import { DISCLAIMER } from "../data/conditions.js";

export default function SkinAnalysis({ count, onResult }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef(null);

  // Bring the result into view as soon as it arrives.
  useEffect(() => {
    if (result) ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [result]);

  const analyze = async () => {
    setLoading(true); setError(""); setResult(null);
    try {
      const r = { ...(await predictSkin(file)), date: new Date().toISOString() };
      setResult(r);
      onResult(r);
    } catch (e) { setError(e.message); }
    setLoading(false);
  };
  const reset = () => { setFile(null); setResult(null); setError(""); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="space-y-6">
      <p className="border-l-4 border-slate bg-panel p-3 text-sm">{DISCLAIMER}</p>
      <ImageUploader file={file} onFile={(f) => { setFile(f); setResult(null); setError(""); }} onAnalyze={analyze} loading={loading} error={error} />
      {result && <AnalysisResult result={result} number={count} innerRef={ref} onReset={reset} />}
    </div>
  );
}
