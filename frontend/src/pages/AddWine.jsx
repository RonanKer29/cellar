// src/pages/AddWine.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const defaultForm = {
  name: "",
  year: "",
  color: "Rouge",
  quantity: 1,
  productor: "",
  country: "",
};

const AddWine = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Envoi JSON (pas d'image)
    await fetch("http://127.0.0.1:8000/api/bottles/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setForm(defaultForm);
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-2 text-gray-900">Ajouter un vin</h1>
      <p className="mb-4 text-gray-500">Mode rapide – infos essentielles</p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Nom du vin</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Ex: Château Margaux"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Millésime</label>
          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Ex: 2015"
            required
            type="number"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Couleur</label>
          <select
            name="color"
            value={form.color}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option>Rouge</option>
            <option>Blanc</option>
            <option>Rosé</option>
            <option>Pétillant</option>
            <option>Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Quantité</label>
          <input
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Producteur</label>
          <input
            name="productor"
            value={form.productor}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Ex: Jean Dupont"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Pays</label>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Ex: France"
            required
          />
        </div>
        <div className="flex space-x-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Ajout..." : "Ajouter"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/ajouter-vin/complet")}
          >
            Mode complet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddWine;
