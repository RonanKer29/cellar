import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Wine,
  Edit,
  Trash2,
  ArrowLeft,
  MapPin,
  Star,
  ShoppingCart,
  Grape,
  FileText,
  Award,
  Minus,
  Eye,
  Clock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const getColorClass = (color) => {
  switch (color) {
    case "Rouge":
      return "bg-gradient-to-b from-red-900 to-red-800";
    case "Blanc":
      return "bg-gradient-to-b from-yellow-50 to-yellow-100";
    case "Rosé":
      return "bg-gradient-to-b from-pink-200 to-pink-300";
    case "Pétillant":
      return "bg-gradient-to-b from-green-100 to-green-200";
    default:
      return "bg-gradient-to-b from-gray-800 to-gray-900";
  }
};

const getGrapeColor = (index) => {
  const colors = [
    "bg-purple-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-teal-500",
  ];
  return colors[index % colors.length];
};

const BottleDetail = () => {
  const { id } = useParams();
  const [bottle, setBottle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quantityToRemove, setQuantityToRemove] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bottles/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setBottle(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    setQuantityToRemove(1);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (quantityToRemove <= 0 || quantityToRemove > bottle.quantity) {
      return;
    }

    setIsDeleting(true);

    try {
      const newQuantity = bottle.quantity - quantityToRemove;

      if (newQuantity === 0) {
        await fetch(`http://127.0.0.1:8000/api/bottles/${id}/`, {
          method: "DELETE",
        });
        navigate("/");
      } else {
        const response = await fetch(
          `http://127.0.0.1:8000/api/bottles/${id}/`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: newQuantity }),
          }
        );

        if (response.ok) {
          setBottle({ ...bottle, quantity: newQuantity });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleMarkAsDrunk = () => {
    fetch(`http://127.0.0.1:8000/api/bottles/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Bue" }),
    }).then(() => window.location.reload());
  };

  const renderStarRating = (rating) => {
    if (!rating) return null;

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating}/5
        </span>
      </div>
    );
  };

  const renderPriceInfo = () => {
    const hasPrice = bottle.price || bottle.estimated_value;
    if (!hasPrice) return null;

    return (
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
        {bottle.price && (
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Prix d'achat
            </p>
            <p className="text-lg font-bold text-gray-900">€{bottle.price}</p>
          </div>
        )}
        {bottle.estimated_value && (
          <div
            className={`text-center ${
              bottle.price ? "mt-2 pt-2 border-t border-gray-200" : ""
            }`}
          >
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Valeur estimée
            </p>
            <p className="text-lg font-bold text-green-600">
              €{bottle.estimated_value}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderRatingBadge = (rating) => {
    if (!rating) return null;
    return (
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Note
          </p>
          <div className="flex items-center justify-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-lg font-bold text-gray-900">{rating}/5</span>
          </div>
        </div>
      </div>
    );
  };

  const renderGrapeComposition = (grapeString) => {
    if (!grapeString) return null;

    const grapes = grapeString.split(",").map((g) => g.trim());
    const percentage = Math.round(100 / grapes.length);

    return (
      <div className="space-y-4">
        {grapes.map((grape, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-gray-700 font-medium text-sm">{grape}</span>
            <div className="flex items-center space-x-3 flex-1 max-w-32 ml-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`${getGrapeColor(
                    index
                  )} h-2 rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 w-8 text-right font-medium">
                {percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wine className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!bottle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-20">
          <Wine className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Vin non trouvé
          </h2>
          <p className="text-gray-500 mb-8">
            Cette bouteille n'existe pas ou a été supprimée.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors font-medium"
          >
            Retour à la collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Retour à la collection</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative">
            <div
              className={`${getColorClass(
                bottle.color
              )} rounded-3xl h-96 lg:h-[600px] flex items-center justify-center relative overflow-hidden shadow-xl`}
            >
              {/* Prix et valeur */}
              {renderPriceInfo()}

              {/* Note */}
              {renderRatingBadge(bottle.rating)}

              {/* Wine Image or Placeholder */}
              <div className="text-center h-full flex items-center justify-center p-8">
                {bottle.image ? (
                  <div className="relative group">
                    <img
                      src={bottle.image}
                      alt={`Bouteille de ${bottle.name}`}
                      className="max-h-80 lg:max-h-96 w-auto object-contain rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "block";
                      }}
                    />
                    <div className="hidden text-center">
                      <Wine className="w-32 h-32 text-white/80 mx-auto mb-4" />
                      <p className="text-white/60 text-sm">
                        Image non disponible
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Wine className="w-32 h-32 text-white/80 mx-auto mb-4" />
                    <p className="text-white/60 text-sm">
                      Aucune image disponible
                    </p>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-4 left-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${
                    bottle.status === "Bue"
                      ? "bg-red-500/90 text-white"
                      : "bg-green-500/90 text-white"
                  }`}
                >
                  {bottle.status}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Title Section */}
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                  {bottle.name}
                </h1>
                <p className="text-xl text-gray-600 font-medium mb-2">
                  {bottle.productor}
                </p>
                <div className="flex items-center text-gray-500 space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">
                    {bottle.region && `${bottle.region}, `}
                    {bottle.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm mb-1 font-medium">
                  Millésime
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {bottle.year}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm mb-1 font-medium">
                  Couleur
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {bottle.color}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm mb-1 font-medium">
                  Quantité
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {bottle.quantity}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm mb-1 font-medium">Volume</p>
                <p className="text-2xl font-bold text-gray-900">750ml</p>
              </div>
            </div>

            {/* Rating Section */}
            {bottle.rating && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Évaluation
                </h3>
                {renderStarRating(bottle.rating)}
              </div>
            )}

            {/* Grape Composition */}
            {bottle.grape && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Grape className="w-5 h-5 mr-2 text-purple-600" />
                  Composition des cépages
                </h3>
                {renderGrapeComposition(bottle.grape)}
              </div>
            )}

            {/* Purchase Information */}
            {(bottle.purchase_date || bottle.purchase_place) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
                  Informations d'achat
                </h3>
                <div className="space-y-3">
                  {bottle.purchase_place && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        Lieu d'achat
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {bottle.purchase_place}
                      </span>
                    </div>
                  )}
                  {bottle.purchase_date && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        Date d'achat
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {new Date(bottle.purchase_date).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {bottle.description && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-gray-600" />
                  Description / Notes personnelles
                </h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
                  {bottle.description}
                </p>
              </div>
            )}

            {/* Tasting Notes */}
            {bottle.tasting_note && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-pink-600" />
                  Notes de dégustation
                </h3>
                <p className="text-gray-700 leading-relaxed bg-amber-50 p-4 rounded-xl border border-amber-100">
                  {bottle.tasting_note}
                </p>
              </div>
            )}

            {/* Technical Specifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-600" />
                Informations techniques
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 font-medium">
                    Date d'ajout
                  </span>
                  <span className="text-gray-900 font-semibold">
                    {new Date(bottle.date_added).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                {bottle.region && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 font-medium">
                      Appellation
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {bottle.region}
                    </span>
                  </div>
                )}
                {bottle.estimated_value && bottle.price && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 font-medium">
                      Plus-value potentielle
                    </span>
                    <span
                      className={`font-semibold ${
                        bottle.estimated_value > bottle.price
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {bottle.estimated_value > bottle.price ? "+" : ""}€
                      {(bottle.estimated_value - bottle.price).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate(`/bouteille/${id}/edit`)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Edit className="w-4 h-4" />
                <span>Modifier</span>
              </button>

              <button
                onClick={handleMarkAsDrunk}
                disabled={bottle.status === "Bue"}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl transition-all font-medium shadow-lg ${
                  bottle.status === "Bue"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                    : "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-xl hover:-translate-y-0.5"
                }`}
              >
                <Wine className="w-4 h-4" />
                <span>
                  {bottle.status === "Bue"
                    ? "Déjà dégusté"
                    : "Marquer comme bu"}
                </span>
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Minus className="w-4 h-4" />
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de suppression */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Minus className="w-5 h-5 text-red-500" />
              <span>Supprimer des bouteilles</span>
            </DialogTitle>
            <DialogDescription>
              Vous avez{" "}
              <span className="font-semibold">
                {bottle?.quantity} bouteille(s)
              </span>{" "}
              de {bottle?.name}. Combien souhaitez-vous en supprimer ?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantité à supprimer</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setQuantityToRemove(Math.max(1, quantityToRemove - 1))
                  }
                  disabled={quantityToRemove <= 1}
                >
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={bottle?.quantity || 1}
                  value={quantityToRemove}
                  onChange={(e) =>
                    setQuantityToRemove(
                      Math.min(
                        bottle?.quantity || 1,
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    )
                  }
                  className="text-center w-20"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setQuantityToRemove(
                      Math.min(bottle?.quantity || 1, quantityToRemove + 1)
                    )
                  }
                  disabled={quantityToRemove >= (bottle?.quantity || 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {quantityToRemove === bottle?.quantity ? (
                <p className="text-red-600 font-medium">
                  ⚠️ Toute la bouteille sera supprimée définitivement de votre
                  collection.
                </p>
              ) : (
                <p>
                  Il restera{" "}
                  <span className="font-semibold">
                    {(bottle?.quantity || 1) - quantityToRemove} bouteille(s)
                  </span>{" "}
                  dans votre collection.
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="flex items-center space-x-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Suppression...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>
                    {quantityToRemove === bottle?.quantity
                      ? "Supprimer tout"
                      : `Supprimer ${quantityToRemove}`}
                  </span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BottleDetail;
