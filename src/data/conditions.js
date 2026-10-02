export const CLASS_LIST = [
  { key: "normal_skin", label: "Normal Skin" },
  { key: "eczema", label: "Eczema" },
  { key: "psoriasis", label: "Psoriasis" },
  { key: "ringworm", label: "Ringworm" },
  { key: "chickenpox", label: "Chickenpox" },
  { key: "rosacea", label: "Rosacea" },
  { key: "cellulitis", label: "Cellulitis" },
];

export const CONDITIONS = {
  "Normal Skin": {
    traits: ["Relatively even skin tone", "No obvious rash", "No major scaling", "No visible inflammatory patches", "No ring-shaped lesion or clusters of blisters"],
    info: "Skin without obvious visible inflammatory lesions or major abnormal patterns.",
  },
  Eczema: {
    traits: ["Dry patches", "Red or inflamed areas", "Rough texture", "Irritated-looking skin", "Scaling, and cracked-looking skin in some cases"],
    info: "Eczema is a general term for itchy, inflamed skin. Appearance varies a lot between people, and a photo alone cannot confirm it.",
  },
  Psoriasis: {
    traits: ["Thickened patches", "Red or inflamed areas", "Visible scaling", "White or silvery-looking scales", "Well-defined plaques"],
    info: "Psoriasis often shows as raised, scaly plaques. A photo alone cannot diagnose it.",
  },
  Ringworm: {
    traits: ["Circular or ring-shaped rash", "Raised or more visible outer border", "Scaling", "Redness", "Relatively clearer centre in some lesions"],
    info: "Ringworm (tinea) is a fungal skin infection. Not every circular rash is ringworm.",
  },
  Chickenpox: {
    traits: ["Multiple small red lesions", "Raised bumps", "Fluid-filled blister-like lesions", "Lesions in different stages", "Scattered rash pattern"],
    info: "Chickenpox usually involves an itchy rash with blisters at different stages. An image alone cannot confirm it.",
  },
  Rosacea: {
    traits: ["Facial redness", "Persistent flushing-like appearance", "Visible small blood vessels in some cases", "Red inflammatory bumps", "Redness commonly around the central face"],
    info: "Rosacea is a long-term condition that mainly affects the face. Facial redness does not automatically mean rosacea.",
  },
  Cellulitis: {
    traits: ["Red or inflamed skin", "Swollen-looking area", "Diffuse redness", "Skin that may look tense", "Less sharply defined borders than some other rashes"],
    info: "Cellulitis is a bacterial skin infection that can need medical treatment.",
  },
};

export const WARNINGS = {
  Cellulitis: "Visual similarity with cellulitis was detected. Cellulitis can require prompt medical assessment. Seek professional medical advice, especially if the area is painful, warm, rapidly spreading, or associated with fever.",
  Chickenpox: "This visual comparison resembles the chickenpox reference image. Image appearance alone cannot confirm chickenpox. Consider medical evaluation, particularly if rash is accompanied by fever or illness.",
};

export const DISCLAIMER = "PredictSkin is an educational prototype and should not be used as a substitute for professional medical diagnosis or treatment.";
export const RESULT_NOTE = "The result represents visual similarity to a very small prototype reference dataset. It is not a medical diagnosis.";
export const ADVICE = "If symptoms persist, worsen, become painful, spread, or cause concern, consult a qualified healthcare professional or dermatologist.";
export const UNCERTAIN = "Visible patterns do not closely match one reference category with sufficient distinction. Consider consulting a dermatologist if you are concerned about the skin changes.";
