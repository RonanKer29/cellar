export const WINE_COLORS = [
  { value: "Rouge", label: "Rouge" },
  { value: "Blanc", label: "Blanc" },
  { value: "Rosé", label: "Rosé" },
  { value: "Pétillant", label: "Pétillant" },
  { value: "Autre", label: "Autre" },
];

export const WINE_STATUS = [
  { value: "En cave", label: "En cave" },
  { value: "Bue", label: "Bue" },
];

export const DEFAULT_WINE_FORM = {
  name: "",
  year: "",
  color: "Rouge",
  quantity: 1,
  productor: "",
  country: "",
  status: "En cave",
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";