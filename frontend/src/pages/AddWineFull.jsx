import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const defaultForm = {
  name: "",
  year: "",
  color: "Rouge",
  quantity: 1,
  productor: "",
  country: "",
  region: "",
  status: "En cave",
  price: "",
  purchase_place: "",
  purchase_date: "",
  notes: "",
  image: null,
};

const colorOptions = ["Rouge", "Blanc", "Rosé", "Pétillant", "Autre"];
const statusOptions = ["En cave", "Bue"];

const AddWineFull = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const fileInput = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Utilise FormData pour l'image !
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    await fetch("http://127.0.0.1:8000/api/bottles/", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-2 text-gray-900">
        Ajouter un vin (mode complet)
      </h1>
      <p className="mb-4 text-gray-500">
        Renseigne toutes les informations de ta bouteille
      </p>
      <form
        className="space-y-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Nom */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Nom du vin *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
            placeholder="Ex: Château Margaux"
            required
          />
        </div>
        {/* Année */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Millésime *
          </label>
          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
            placeholder="Ex: 2015"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            required
          />
        </div>
        {/* Couleur */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Couleur *</label>
          <select
            name="color"
            value={form.color}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
          >
            {colorOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {/* Producteur */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Producteur</label>
          <input
            name="productor"
            value={form.productor}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
            placeholder="Nom du producteur"
          />
        </div>
        {/* Pays */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Pays</label>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
            placeholder="France, Italie..."
          />
        </div>
        {/* Région */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Région/Appellation
          </label>
          <input
            name="region"
            value={form.region}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
            placeholder="Bordeaux, Bourgogne..."
          />
        </div>
        {/* Quantité */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Quantité *</label>
          <input
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
            required
          />
        </div>
        {/* Statut */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Statut *</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
          >
            {statusOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {/* Prix */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Prix (€)</label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
            placeholder="Prix d'achat"
          />
        </div>
        {/* Lieu d'achat */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Lieu d'achat
          </label>
          <input
            name="purchase_place"
            value={form.purchase_place}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
            placeholder="Caviste, supermarché..."
          />
        </div>
        {/* Date d'achat */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Date d'achat
          </label>
          <input
            name="purchase_date"
            type="date"
            value={form.purchase_date}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
          />
        </div>
        {/* Notes */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-pink-500"
            placeholder="Notes personnelles, dégustation..."
          />
        </div>
        {/* Image */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Photo</label>
          <div className="flex items-center space-x-4">
            <input
              ref={fileInput}
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
            />
            {preview && (
              <img
                src={preview}
                alt="aperçu"
                className="h-16 w-16 object-cover rounded-xl border"
                onClick={() => {
                  setPreview(null);
                  setForm((prev) => ({ ...prev, image: null }));
                  fileInput.current.value = "";
                }}
                title="Cliquer pour retirer la photo"
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Ajout..." : "Ajouter le vin"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddWineFull;
