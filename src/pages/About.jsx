import { DISCLAIMER } from "../data/conditions.js";

export default function About() {
  return (
    <section className="max-w-2xl border border-line bg-panel p-5 sm:p-7">
      <h2 className="text-2xl font-semibold">About this prototype</h2>
      <p className="mt-3">{DISCLAIMER}</p>
      <h3 className="mt-5 text-lg font-semibold">How the comparison works</h3>
      <p className="mt-2">A pretrained image network (used only as a feature extractor, with its classification layer removed) turns your photo and each of the seven reference images into a numeric embedding. PredictSkin measures the cosine similarity between your embedding and each reference, and ranks the categories. No network was trained on skin data.</p>
      <h3 className="mt-5 text-lg font-semibold">Limits</h3>
      <p className="mt-2">With one reference image per category, a high score means the photo looks like that one image, not that the condition is present. If scores are close or low, the result is shown as uncertain.</p>
      <h3 className="mt-5 text-lg font-semibold">Privacy</h3>
      <p className="mt-2">Uploaded images are processed in memory for a single prediction and are not saved. There is no server image history.</p>
    </section>
  );
}
