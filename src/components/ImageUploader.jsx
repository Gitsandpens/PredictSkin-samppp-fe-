import { useEffect, useRef, useState } from "react";

const OK = ["image/jpeg", "image/png", "image/webp"];
const size = (b) => (b > 1048576 ? (b / 1048576).toFixed(2) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB");

export default function ImageUploader({ file, onFile, onAnalyze, loading, error }) {
  const input = useRef(null);
  const [drag, setDrag] = useState(false);
  const [localError, setLocalError] = useState("");
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) return setUrl(null);
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  const pick = (f) => {
    if (!f) return;
    if (!OK.includes(f.type) && !/\.(jpe?g|png|webp)$/i.test(f.name)) {
      return setLocalError("Unsupported file. Please choose a JPG, JPEG, PNG, or WEBP image.");
    }
    setLocalError("");
    onFile(f);
  };

  return (
    <section className="border border-line bg-panel p-5 sm:p-7">
      <h2 className="text-2xl font-semibold">SKIN IMAGE ANALYSIS</h2>
      <p className="mt-1 max-w-xl text-mute">Upload a skin photograph and compare its visual features with seven prototype reference categories.</p>

      <div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}
        className={`mt-5 flex min-h-64 flex-col items-center justify-center gap-3 border-2 border-dashed p-4 text-center ${drag ? "border-brand bg-sage" : "border-line"}`}>
        {url ? (
          <div className="relative">
            <img src={url} alt="Uploaded skin preview" className="max-h-72 max-w-full" />
            {loading && <div className="scan" aria-hidden="true" />}
          </div>
        ) : (
          <p className="text-mute">Drag and drop an image here, or choose one.<br />JPG, JPEG, PNG or WEBP, up to 10 MB.</p>
        )}
        {file && <p className="text-sm">{file.name} <span className="text-mute">({size(file.size)})</span></p>}
        <input ref={input} type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" className="sr-only"
          onChange={(e) => { pick(e.target.files[0]); e.target.value = ""; }} />
        <button type="button" className="btn-ghost" onClick={() => input.current.click()}>{file ? "Choose another image" : "Choose Image"}</button>
      </div>

      {(localError || error) && <p role="alert" className="mt-4 border-l-4 border-alert bg-alertbg p-3 text-alert">{localError || error}</p>}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button className="btn" disabled={!file || loading} onClick={onAnalyze}>ANALYZE SKIN</button>
        {loading && <span role="status" className="text-mute">Analyzing image...</span>}
      </div>
    </section>
  );
}
