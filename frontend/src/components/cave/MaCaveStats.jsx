/**
 * @fileoverview Composant d'affichage des statistiques de la collection de vins
 * Calcule et présente les métriques importantes de la cave (valeur, millésimes, régions, etc.)
 */

import { Wine, Calendar, MapPin, Euro, TrendingUp } from "lucide-react";
import { Badge } from "../ui/badge";

/**
 * Panneau de statistiques détaillées de la collection de vins
 * Calcule automatiquement les métriques financières, temporelles et géographiques
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Array<Object>} props.bottles - Liste complète des bouteilles de la collection
 * @param {number} props.bottles[].price - Prix unitaire d'une bouteille
 * @param {number} props.bottles[].quantity - Quantité en stock
 * @param {number} props.bottles[].year - Millésime du vin
 * @param {string} props.bottles[].region - Région viticole
 * @param {string} props.bottles[].color - Type de vin (Rouge, Blanc, Rosé, Pétillant)
 * 
 * @example
 * <MaCaveStats 
 *   bottles={[
 *     { price: 25, quantity: 2, year: 2018, region: "Bordeaux", color: "Rouge" },
 *     { price: 15, quantity: 1, year: 2020, region: "Loire", color: "Blanc" }
 *   ]}
 * />
 * 
 * @returns {JSX.Element} Panneau avec statistiques financières, temporelles et de distribution
 */
const MaCaveStats = ({ bottles }) => {
  // Calculate statistics
  const totalValue = bottles.reduce((sum, bottle) => sum + (bottle.price || 0) * bottle.quantity, 0);
  const averagePrice = bottles.length > 0 ? (totalValue / bottles.reduce((sum, bottle) => sum + bottle.quantity, 0)) : 0;
  const oldestWine = bottles.reduce((oldest, bottle) => (!oldest || bottle.year < oldest.year) ? bottle : oldest, null);
  const newestWine = bottles.reduce((newest, bottle) => (!newest || bottle.year > newest.year) ? bottle : newest, null);
  
  // Most common region
  const regionCounts = bottles.reduce((counts, bottle) => {
    if (bottle.region) {
      counts[bottle.region] = (counts[bottle.region] || 0) + bottle.quantity;
    }
    return counts;
  }, {});
  const topRegion = Object.entries(regionCounts).sort(([,a], [,b]) => b - a)[0];

  // Color distribution
  const colorCounts = bottles.reduce((counts, bottle) => {
    counts[bottle.color] = (counts[bottle.color] || 0) + bottle.quantity;
    return counts;
  }, {});

  const stats = [
    {
      icon: Euro,
      label: "Valeur totale",
      value: `${Math.round(totalValue).toLocaleString()} €`,
      subtitle: `Prix moyen: ${Math.round(averagePrice)} €`,
      color: "green"
    },
    {
      icon: Calendar,
      label: "Millésimes",
      value: oldestWine && newestWine ? `${oldestWine.year} - ${newestWine.year}` : "-",
      subtitle: `Étendue: ${newestWine && oldestWine ? newestWine.year - oldestWine.year : 0} ans`,
      color: "blue"
    },
    {
      icon: MapPin,
      label: "Région principale",
      value: topRegion ? topRegion[0] : "Aucune",
      subtitle: topRegion ? `${topRegion[1]} bouteilles` : "",
      color: "purple"
    },
    {
      icon: TrendingUp,
      label: "Collection",
      value: `${bottles.reduce((sum, bottle) => sum + bottle.quantity, 0)} bouteilles`,
      subtitle: `${Object.keys(colorCounts).length} types de vins`,
      color: "orange"
    }
  ];

  /**
   * Retourne les classes CSS appropriées pour chaque couleur de statistique
   * @param {string} color - Couleur de la statistique (green, blue, purple, orange)
   * @returns {string} Classes CSS pour l'icône colorée
   */
  const getColorClasses = (color) => {
    const colors = {
      green: "bg-green-100 text-green-600",
      blue: "bg-blue-100 text-blue-600", 
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600"
    };
    return colors[color] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Aperçu de votre collection</h2>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border hover:shadow-sm transition-shadow">
              <div className={`p-2 rounded-xl ${getColorClasses(stat.color)}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900 truncate">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Color distribution */}
        {Object.keys(colorCounts).length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Répartition par type</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(colorCounts)
                .sort(([,a], [,b]) => b - a)
                .map(([color, count]) => (
                  <Badge key={color} variant="outline" className="text-xs">
                    {color}: {count}
                  </Badge>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaCaveStats;