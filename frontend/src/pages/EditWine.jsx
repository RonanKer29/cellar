import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Wine, Upload, X, Star, ArrowLeft, Calendar, MapPin, DollarSign, FileText, Camera, Save } from "lucide-react";
import ErrorState from "../components/common/ErrorState";
import LoadingState from "../components/common/LoadingState";
import GrapeVarietyInput from "../components/wine/GrapeVarietyInput";
import { WINE_COLORS, WINE_STATUS } from "../utils/constants";
import { COUNTRIES, getRegionsByCountry, getAllRegions } from "../data/wine-data";
import { apiService } from "../services/api";

const EditWine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInput = useRef(null);
  
  const [form, setForm] = useState({
    name: "",
    year: "",
    color: "Rouge",
    quantity: 1,
    productor: "",
    country: "",
    region: "",
    grape: "",
    status: "En cave",
    price: "",
    estimated_value: "",
    purchase_place: "",
    purchase_date: "",
    description: "",
    tasting_note: "",
    rating: "",
    image: null,
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [originalImage, setOriginalImage] = useState(null);
  
  const availableRegions = form.country ? getRegionsByCountry(form.country) : getAllRegions();

  // Charger les données de la bouteille
  useEffect(() => {
    const fetchBottle = async () => {
      try {
        const data = await apiService.getBottle(id);
        
        // Convertir les données pour le formulaire
        setForm({
          name: data.name || "",
          year: data.year || "",
          color: data.color || "Rouge",
          quantity: data.quantity || 1,
          productor: data.productor || "",
          country: data.country || "",
          region: data.region || "",
          grape: data.grape || "",
          status: data.status || "En cave",
          price: data.price || "",
          estimated_value: data.estimated_value || "",
          purchase_place: data.purchase_place || "",
          purchase_date: data.purchase_date || "",
          description: data.description || "",
          tasting_note: data.tasting_note || "",
          rating: data.rating || "",
          image: null, // L'image sera gérée séparément
        });
        
        // Gérer l'image existante
        if (data.image) {
          setOriginalImage(data.image);
          setPreview(data.image);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bottle:', err);
        setError(err.message || "Erreur lors du chargement de la bouteille");
        setLoading(false);
      }
    };

    fetchBottle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGrapeChange = (grapeString) => {
    setForm((prev) => ({ ...prev, grape: grapeString }));
  };

  const removeImage = () => {
    setPreview(originalImage); // Revenir à l'image originale
    setForm((prev) => ({ ...prev, image: null }));
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();
      
      // Ajouter tous les champs du formulaire
      Object.entries(form).forEach(([key, value]) => {
        if (key === "image") {
          // Seulement ajouter l'image si une nouvelle a été sélectionnée
          if (value) {
            formData.append(key, value);
          }
        } else if (value !== "" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      await apiService.patchBottle(id, formData);
      navigate(`/bouteille/${id}`);
    } catch (err) {
      console.error('Error updating bottle:', err);
      setError(err.message || "Erreur lors de la modification du vin");
    } finally {
      setSaving(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                rating: prev.rating === star.toString() ? "" : star.toString(),
              }))
            }
            className={`p-1 rounded transition-colors ${
              parseInt(form.rating) >= star
                ? "text-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            }`}
          >
            <Star
              className={`w-6 h-6 ${
                parseInt(form.rating) >= star ? "fill-current" : ""
              }`}
            />
          </button>
        ))}
        {form.rating && (
          <span className="ml-2 text-sm text-gray-600">{form.rating}/5</span>
        )}
      </div>
    );
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error && !form.name) {
    return (
      <ErrorState 
        message="Erreur lors du chargement de la bouteille" 
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate(`/bouteille/${id}`)}
            className="flex items-center space-x-3 text-slate-600 hover:text-slate-800 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">Retour à la fiche</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-8 pb-12 px-4">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Wine className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">
              Modifier le vin
            </CardTitle>
            <CardDescription className="text-slate-600">
              Modifiez les informations de votre bouteille
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form
              className="space-y-8"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {/* Section: Informations de base */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Wine className="w-5 h-5 text-blue-600" />
                    Informations de base
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nom du vin */}
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                        Nom du vin *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ex: Château Margaux"
                        required
                        className="h-11"
                      />
                    </div>

                    {/* Millésime */}
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-sm font-medium text-slate-700">
                        Millésime *
                      </Label>
                      <Input
                        id="year"
                        name="year"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={form.year}
                        onChange={handleChange}
                        placeholder="2020"
                        required
                        className="h-11"
                      />
                    </div>

                    {/* Couleur */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Couleur *
                      </Label>
                      <Select
                        value={form.color}
                        onValueChange={(value) => handleSelectChange("color", value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Sélectionner une couleur" />
                        </SelectTrigger>
                        <SelectContent>
                          {WINE_COLORS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Producteur */}
                    <div className="space-y-2">
                      <Label htmlFor="productor" className="text-sm font-medium text-slate-700">
                        Producteur *
                      </Label>
                      <Input
                        id="productor"
                        name="productor"
                        value={form.productor}
                        onChange={handleChange}
                        placeholder="Nom du producteur"
                        required
                        className="h-11"
                      />
                    </div>

                    {/* Pays */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Pays *
                      </Label>
                      <Combobox
                        options={COUNTRIES}
                        value={form.country}
                        onValueChange={(value) => {
                          setForm(prev => ({ ...prev, country: value, region: "" }));
                        }}
                        placeholder="Sélectionner un pays..."
                        searchPlaceholder="Rechercher un pays..."
                        allowCustom={true}
                      />
                    </div>

                    {/* Région */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Région/Appellation
                      </Label>
                      <Combobox
                        options={availableRegions}
                        value={form.region}
                        onValueChange={(value) => handleSelectChange("region", value)}
                        placeholder="Sélectionner une région..."
                        searchPlaceholder="Rechercher une région..."
                        allowCustom={true}
                      />
                    </div>

                    {/* Quantité */}
                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-sm font-medium text-slate-700">
                        Quantité *
                      </Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                        className="h-11"
                      />
                    </div>

                    {/* Statut */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Statut *
                      </Label>
                      <Select
                        value={form.status}
                        onValueChange={(value) => handleSelectChange("status", value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          {WINE_STATUS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Cépages avec système avancé */}
                  <div className="md:col-span-2">
                    <GrapeVarietyInput
                      value={form.grape}
                      onChange={handleGrapeChange}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section: Informations d'achat */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Informations d'achat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Prix d'achat */}
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-medium text-slate-700">
                        Prix d'achat (€)
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="h-11"
                      />
                    </div>

                    {/* Valeur estimée */}
                    <div className="space-y-2">
                      <Label htmlFor="estimated_value" className="text-sm font-medium text-slate-700">
                        Valeur estimée (€)
                      </Label>
                      <Input
                        id="estimated_value"
                        name="estimated_value"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.estimated_value}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="h-11"
                      />
                    </div>

                    {/* Lieu d'achat */}
                    <div className="space-y-2">
                      <Label htmlFor="purchase_place" className="text-sm font-medium text-slate-700">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Lieu d'achat
                      </Label>
                      <Input
                        id="purchase_place"
                        name="purchase_place"
                        value={form.purchase_place}
                        onChange={handleChange}
                        placeholder="Caviste, supermarché..."
                        className="h-11"
                      />
                    </div>

                    {/* Date d'achat */}
                    <div className="space-y-2">
                      <Label htmlFor="purchase_date" className="text-sm font-medium text-slate-700">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Date d'achat
                      </Label>
                      <Input
                        id="purchase_date"
                        name="purchase_date"
                        type="date"
                        value={form.purchase_date}
                        onChange={handleChange}
                        className="h-11"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section: Dégustation et notes */}
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    Dégustation et notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Note étoiles */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Note (sur 5)
                    </Label>
                    {renderStarRating()}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                      Description / Notes personnelles
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Notes personnelles, contexte d'achat..."
                      className="resize-none"
                    />
                  </div>

                  {/* Note de dégustation */}
                  <div className="space-y-2">
                    <Label htmlFor="tasting_note" className="text-sm font-medium text-slate-700">
                      Note de dégustation
                    </Label>
                    <Textarea
                      id="tasting_note"
                      name="tasting_note"
                      value={form.tasting_note}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Arômes, saveurs, impressions de dégustation..."
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section: Photo */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Camera className="w-5 h-5 text-purple-600" />
                    Photo de la bouteille
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 border-dashed rounded-xl cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-purple-400" />
                          <p className="mb-2 text-sm text-purple-600">
                            <span className="font-semibold">
                              Cliquez pour changer l'image
                            </span>
                          </p>
                          <p className="text-xs text-purple-500">
                            JPG, PNG ou WEBP
                          </p>
                        </div>
                        <input
                          ref={fileInput}
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {preview && (
                      <div className="relative inline-block">
                        <img
                          src={preview}
                          alt="Aperçu"
                          className="h-32 w-auto object-cover rounded-xl border shadow-md"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                          title="Revenir à l'image originale"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {saving ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sauvegarde en cours...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder les modifications
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/bouteille/${id}`)}
                  className="flex-1 h-12 border-2 border-slate-300 hover:border-purple-500 text-slate-700 hover:text-purple-600 font-medium rounded-xl transition-all hover:bg-purple-50"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditWine;