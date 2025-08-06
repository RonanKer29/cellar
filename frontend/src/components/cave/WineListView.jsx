/**
 * @fileoverview Vue en liste des bouteilles de vin avec affichage tabulaire
 * Interface responsive adaptée aux grands écrans avec version mobile compacte
 */

import { Wine, Edit, Trash2, Calendar, MapPin, Euro, Star, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
// Removed unused imports - component has its own utility functions
import { apiService } from "../../services/api";
import { getWineColorClass } from "../../utils/wineColors";
import { getBottleDisplayStatus } from "../../utils/bottleFilters";
import { addHistoryEvent, EVENT_TYPES } from "../../services/historyService";

/**
 * Affichage en liste responsive des bouteilles de vin
 * Présente un tableau détaillé sur desktop et des cartes compactes sur mobile
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Array<Object>} props.bottles - Liste des bouteilles à afficher
 * @param {Function} [props.onWineClick] - Fonction callback lors du clic sur une bouteille
 * 
 * @example
 * <WineListView 
 *   bottles={bottles}
 *   onWineClick={(bottle) => console.log('Bouteille sélectionnée:', bottle)}
 * />
 * 
 * @returns {JSX.Element} Vue liste avec tableau desktop et cartes mobiles
 */
const WineListView = ({ bottles, onWineClick }) => {
  const navigate = useNavigate();
  
  /**
   * Gère la suppression d'une bouteille avec confirmation
   * @param {Object} bottle - La bouteille à supprimer
   */
  const handleDelete = async (bottle) => {
    if (window.confirm(`Supprimer "${bottle.name}" de votre cave ?`)) {
      try {
        // Enregistrer l'événement de suppression AVANT la suppression
        addHistoryEvent({
          type: EVENT_TYPES.DELETED,
          bottleId: bottle.id,
          bottleName: bottle.name,
          bottleProductor: bottle.productor,
          bottleYear: bottle.year,
          bottleColor: bottle.color,
          quantity: bottle.quantity // Suppression complète
        });

        await apiService.deleteBottle(bottle.id);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting bottle:", error);
        alert("Erreur lors de la suppression");
      }
    }
  };

  /**
   * Navigue vers la page de détail d'une bouteille
   * @param {Object} bottle - La bouteille sélectionnée
   */
  const handleCardClick = (bottle) => {
    navigate(`/bouteille/${bottle.id}`);
  };

  /**
   * Retourne les classes de dégradé de couleur pour les icônes
   * @param {string} color - Type de vin
   * @returns {string} Classes CSS pour le dégradé
   */
  const getColorGradient = (color) => {
    switch (color) {
      case "Rouge":
        return "from-red-500 to-red-600";
      case "Blanc":
        return "from-yellow-400 to-yellow-500";
      case "Rosé":
        return "from-pink-400 to-pink-500";
      case "Pétillant":
        return "from-blue-400 to-blue-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  // Utilisation du système unifié de couleurs de vin

  /**
   * Détermine le statut d'affichage basé sur la quantité réelle
   * @param {Object} bottle - La bouteille
   * @returns {Object} Informations de statut pour l'affichage
   */
  const getRealBottleStatus = (bottle) => {
    const quantity = bottle.quantity || 0;
    if (quantity === 0) {
      return {
        label: 'Consommée',
        variant: 'destructive',
        className: 'opacity-70'
      };
    }
    return {
      label: 'En cave',
      variant: 'default',
      className: 'opacity-100'
    };
  };

  /**
   * Affiche la notation en étoiles
   * @param {number} rating - Note sur 5 étoiles
   * @returns {JSX.Element|null} Composant d'étoiles ou null
   */
  const renderStarRating = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">{rating}/5</span>
      </div>
    );
  };

  return (
    <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
            <tr className="text-sm text-slate-600 font-semibold">
              <th className="px-6 py-5">Vin</th>
              <th className="px-6 py-5">Millésime</th>
              <th className="px-6 py-5">Région</th>
              <th className="px-6 py-5">Producteur</th>
              <th className="px-6 py-5">Quantité</th>
              <th className="px-6 py-5">Prix</th>
              <th className="px-6 py-5">Note</th>
              <th className="px-6 py-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bottles.map((bottle) => (
              <tr 
                key={bottle.id} 
                className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent cursor-pointer transition-all duration-300 group hover:shadow-sm transform-gpu focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                onClick={() => handleCardClick(bottle)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(bottle);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Voir les détails de ${bottle.name}, ${bottle.color} ${bottle.year || ''} de ${bottle.productor || 'producteur inconnu'}`}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${getColorGradient(bottle.color)} shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                      <Wine className="w-5 h-5 text-white drop-shadow-sm group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors truncate">
                        {bottle.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs border-2 ${getWineColorClass(bottle.color, 'badge')} font-medium group-hover:scale-105 transition-transform duration-200`}
                        >
                          {bottle.color}
                        </Badge>
                        <Badge 
                          variant={getRealBottleStatus(bottle).variant}
                          className={`text-xs font-medium group-hover:scale-105 transition-transform duration-200 ${getRealBottleStatus(bottle).className}`}
                        >
                          {getRealBottleStatus(bottle).label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{bottle.year || "N/A"}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-gray-700">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{bottle.region || "N/A"}</p>
                        {bottle.country && bottle.country !== bottle.region && (
                          <p className="text-xs text-gray-500 truncate">{bottle.country}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-gray-700">
                  <span className="font-medium truncate block">{bottle.productor || "N/A"}</span>
                </td>
                <td className="px-6 py-5">
                  <Badge variant="secondary" className="font-medium group-hover:scale-105 transition-transform duration-200">
                    <Package className="w-3 h-3 mr-1 group-hover:animate-pulse" />
                    {bottle.quantity}x
                  </Badge>
                </td>
                <td className="px-6 py-5">
                  {bottle.price ? (
                    <div className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-semibold text-gray-900">{bottle.price} €</p>
                        {bottle.quantity > 1 && (
                          <p className="text-xs text-gray-500">
                            {(bottle.price * bottle.quantity).toFixed(2)} € total
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-6 py-5">
                  {renderStarRating(bottle.rating)}
                </td>
                <td className="px-6 py-5">
                  <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                    <Link to={`/bouteille/${bottle.id}/edit`}>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:scale-110 transition-all duration-200 hover:shadow-md"
                      >
                        <Edit className="w-4 h-4 hover:rotate-12 transition-transform duration-200" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(bottle)}
                      className="text-gray-600 hover:text-red-600 hover:bg-red-50 hover:scale-110 transition-all duration-200 hover:shadow-md"
                    >
                      <Trash2 className="w-4 h-4 hover:animate-pulse transition-all duration-200" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <CardContent className="block lg:hidden p-0">
        <div className="divide-y divide-slate-100">
          {bottles.map((bottle) => (
            <div 
              key={bottle.id} 
              className="p-5 hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent cursor-pointer transition-all duration-300 group hover:shadow-sm transform-gpu focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={() => handleCardClick(bottle)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(bottle);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Voir les détails de ${bottle.name}, ${bottle.color} ${bottle.year || ''} de ${bottle.productor || 'producteur inconnu'}`}
            >
              <div className="flex items-start space-x-4">
                {/* Icône du vin avec gradient */}
                <div className={`p-3 rounded-2xl flex-shrink-0 bg-gradient-to-br ${getColorGradient(bottle.color)} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <Wine className="w-6 h-6 text-white drop-shadow-sm group-hover:rotate-12 transition-transform duration-300" />
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Header avec titre et actions */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors truncate">
                        {bottle.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2 flex-wrap">
                        <Badge 
                          variant="outline" 
                          className={`text-xs border-2 ${getWineColorClass(bottle.color, 'badge')} font-medium group-hover:scale-105 transition-transform duration-200`}
                        >
                          {bottle.color}
                        </Badge>
                        <Badge 
                          variant={getRealBottleStatus(bottle).variant}
                          className={`text-xs font-medium group-hover:scale-105 transition-transform duration-200 ${getRealBottleStatus(bottle).className}`}
                        >
                          {getRealBottleStatus(bottle).label}
                        </Badge>
                        {bottle.quantity > 1 && (
                          <Badge variant="secondary" className="text-xs font-medium group-hover:scale-105 transition-transform duration-200">
                            <Package className="w-3 h-3 mr-1 group-hover:animate-pulse" />
                            {bottle.quantity}x
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex space-x-1 ml-3" onClick={(e) => e.stopPropagation()}>
                      <Link to={`/bouteille/${bottle.id}/edit`}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:scale-110 transition-all duration-200 hover:shadow-md"
                        >
                          <Edit className="w-4 h-4 hover:rotate-12 transition-transform duration-200" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(bottle)}
                        className="text-gray-600 hover:text-red-600 hover:bg-red-50 hover:scale-110 transition-all duration-200 hover:shadow-md"
                      >
                        <Trash2 className="w-4 h-4 hover:animate-pulse transition-all duration-200" />
                      </Button>
                    </div>
                  </div>

                  {/* Informations détaillées */}
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    {/* Millésime et Prix */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{bottle.year || "N/A"}</span>
                      </div>
                      {bottle.price && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Euro className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-900">{bottle.price} €</span>
                          {bottle.quantity > 1 && (
                            <span className="text-xs text-gray-500 ml-1">
                              ({(bottle.price * bottle.quantity).toFixed(2)} € total)
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Région */}
                    {bottle.region && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium truncate">{bottle.region}</span>
                        {bottle.country && bottle.country !== bottle.region && (
                          <span className="text-gray-400 text-xs">• {bottle.country}</span>
                        )}
                      </div>
                    )}

                    {/* Producteur */}
                    {bottle.productor && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{bottle.productor}</span>
                      </div>
                    )}

                    {/* Note */}
                    {bottle.rating && (
                      <div className="flex items-center justify-center py-2">
                        {renderStarRating(bottle.rating)}
                      </div>
                    )}

                    {/* Description courte */}
                    {(bottle.description || bottle.tasting_note) && (
                      <div className="text-xs text-gray-500 line-clamp-2 bg-gray-50 p-3 rounded-lg border mt-2 group-hover:bg-gray-100 group-hover:border-gray-300 transition-all duration-200">
                        {bottle.description || bottle.tasting_note}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WineListView;