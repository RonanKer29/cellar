/**
 * @fileoverview Composant d'affichage des statistiques de la collection de vins
 * Calcule et présente les métriques importantes de la cave (valeur, millésimes, régions, etc.)
 */

import { Wine, Calendar, MapPin, Euro, TrendingUp } from "lucide-react";
import { Badge } from "../ui/badge";
import StatCard from "../dashboard/StatCard";
import { getWineColorClass } from "../../utils/wineColors";

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
      title: "Valeur totale",
      value: `${Math.round(totalValue).toLocaleString()} €`,
      subtitle: `Prix moyen: ${Math.round(averagePrice)} €`,
      color: "green"
    },
    {
      icon: Calendar,
      title: "Millésimes",
      value: oldestWine && newestWine ? `${oldestWine.year} - ${newestWine.year}` : "-",
      subtitle: `Étendue: ${newestWine && oldestWine ? newestWine.year - oldestWine.year : 0} ans`,
      color: "blue"
    },
    {
      icon: MapPin,
      title: "Région principale",
      value: topRegion ? topRegion[0] : "Aucune",
      subtitle: topRegion ? `${topRegion[1]} bouteilles` : "",
      color: "purple"
    },
    {
      icon: Wine,
      title: "Collection",
      value: `${bottles.reduce((sum, bottle) => sum + bottle.quantity, 0)}`,
      subtitle: `${Object.keys(colorCounts).length} types de vins`,
      color: "pink"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header moderne */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Aperçu de votre collection</h2>
        <p className="text-gray-600">Découvrez les statistiques détaillées de votre cave</p>
      </div>
      
      {/* Grid des StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Section répartition par couleur compacte */}
      {Object.keys(colorCounts).length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Répartition par type</h3>
              <p className="text-gray-600">Distribution de vos vins par couleur</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          
          <div className="space-y-3">
            {Object.entries(colorCounts)
              .sort(([,a], [,b]) => b - a)
              .map(([color, count], index) => {
                const bgColor = getWineColorClass(color, 'primary');
                const totalBottles = bottles.reduce((sum, bottle) => sum + bottle.quantity, 0);
                const percentage = Math.round((count / totalBottles) * 100);
                
                return (
                  <div key={color} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${bgColor}`}></div>
                      <span className="font-medium text-gray-900">{color}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${bgColor} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-right min-w-[60px]">
                        <span className="font-bold text-gray-900">{count}</span>
                        <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaCaveStats;