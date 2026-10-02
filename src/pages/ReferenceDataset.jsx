import { useEffect, useState } from "react";
import { getDatasetStatus, referenceImageUrl } from "../services/api.js";
import { CLASS_LIST } from "../data/conditions.js";

export default function ReferenceDataset() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { getDatasetStatus().then(setStatus).catch((e) => setError(e.message)); }, []);

  return (
    <section className="border border-line bg-panel p-5 sm:p-7">
      <h2 className="text-2xl font-semibold">PREDICTSKIN PROTOTYPE REFERENCE SET</h2>
      <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-2">
        <div><dt className="text-sm text-mute">Total images</dt><dd className="serif text-2xl">7</dd></div>
        <div><dt className="text-sm text-mute">Total classes</dt><dd className="serif text-2xl">7</dd></div>
        <div><dt className="text-sm text-mute">Images per class</dt><dd className="serif text-2xl">1</dd></div>
      </dl>
      {error && <p role="alert" className="mt-4 border-l-4 border-alert bg-alertbg p-3 text-alert">{error}</p>}
      {status && !status.ready && (
        <p role="alert" className="mt-4 border-l-4 border-alert bg-alertbg p-3 text-alert">
          Reference dataset incomplete. {status.missing.length ? `Missing: ${status.missing.join(", ")}.` : status.error}
        </p>
      )}
      <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CLASS_LIST.map(({ key, label }, i) => {
          const present = status?.classes[label];
          return (
            <li key={key} className="border border-line">
              <div className="flex aspect-[4/3] items-center justify-center bg-sage text-sm text-mute">
                {present ? <img src={referenceImageUrl(key)} alt={`${label} reference`} className="h-full w-full object-cover" /> : status ? "Image missing" : "Loading..."}
              </div>
              <div className="p-3"><span className="text-mute">{String(i + 1).padStart(2, "0")}</span> {label}</div>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 text-sm text-mute">This reference set is intentionally small and is used only for demonstration purposes. It is not a clinical dermatology dataset.</p>
    </section>
  );
}
