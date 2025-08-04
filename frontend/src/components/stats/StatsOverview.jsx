/**
 * @fileoverview Vue d'ensemble statistique complète de la collection de vins
 * Fournit un tableau de bord détaillé avec métriques principales et analyses approfondies
 */

import { 
  Euro, 
  Wine, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  TrendingDown,
  Target,
  Award
} from "lucide-react";
import { Badge } from "../ui/badge";

/**
 * Composant de vue d'ensemble statistique complète de la cave
 * Affiche les métriques principales et les analyses détaillées de la collection
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Array<Object>} props.bottles - Collection complète des bouteilles
 * @param {number} props.bottles[].price - Prix unitaire
 * @param {number} props.bottles[].quantity - Quantité en stock
 * @param {number} props.bottles[].year - Millésime
 * @param {string} props.bottles[].color - Type de vin
 * @param {string} props.bottles[].region - Région viticole
 * @param {string} props.bottles[].productor - Nom du producteur
 * @param {string} props.bottles[].name - Nom du vin
 * 
 * @example
 * <StatsOverview bottles={bottlesData} />
 * 
 * @returns {JSX.Element} Tableau de bord complet avec statistiques principales et détaillées
 */
const StatsOverview = ({ bottles }) => {
  // Calculate comprehensive statistics
  const totalBottles = bottles.reduce((sum, bottle) => sum + bottle.quantity, 0);
  const totalValue = bottles.reduce((sum, bottle) => sum + (bottle.price || 0) * bottle.quantity, 0);
  const averagePrice = totalBottles > 0 ? totalValue / totalBottles : 0;
  
  // Vintage analysis
  const vintages = bottles.map(bottle => bottle.year).filter(Boolean);
  const oldestVintage = Math.min(...vintages);
  const newestVintage = Math.max(...vintages);
  const averageAge = new Date().getFullYear() - (vintages.reduce((sum, year) => sum + year, 0) / vintages.length);
  
  // Most expensive wine
  const mostExpensiveWine = bottles.reduce((max, bottle) => 
    (bottle.price || 0) > (max.price || 0) ? bottle : max, bottles[0] || {}
  );
  
  // Region analysis
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
  const topColor = Object.entries(colorCounts).sort(([,a], [,b]) => b - a)[0];
  
  // Producer analysis
  const producerCounts = bottles.reduce((counts, bottle) => {
    if (bottle.productor) {
      counts[bottle.productor] = (counts[bottle.productor] || 0) + bottle.quantity;
    }
    return counts;
  }, {});
  const topProducer = Object.entries(producerCounts).sort(([,a], [,b]) => b - a)[0];

  const mainStats = [
    {
      icon: Euro,
      label: "Valeur totale",
      value: `${Math.round(totalValue).toLocaleString()} €`,
      subtitle: `Prix moyen: ${Math.round(averagePrice)} €`,
      color: "green",
      trend: totalValue > 5000 ? "up" : totalValue > 1000 ? "stable" : "down"
    },
    {
      icon: Wine,
      label: "Collection",
      value: `${totalBottles} bouteilles`,
      subtitle: `${Object.keys(colorCounts).length} types différents`,
      color: "blue",
      trend: totalBottles > 50 ? "up" : totalBottles > 20 ? "stable" : "down"
    },
    {
      icon: Calendar,
      label: "Millésimes",
      value: vintages.length > 0 ? `${oldestVintage} - ${newestVintage}` : "N/A",
      subtitle: `Âge moyen: ${Math.round(averageAge)} ans`,
      color: "purple",
      trend: averageAge < 10 ? "up" : averageAge < 20 ? "stable" : "down"
    },
    {
      icon: MapPin,
      label: "Régions",
      value: Object.keys(regionCounts).length,
      subtitle: topRegion ? `${topRegion[0]} (${topRegion[1]} btl)` : "Aucune",
      color: "orange",
      trend: Object.keys(regionCounts).length > 5 ? "up" : "stable"
    }
  ];

  const detailedStats = [
    {
      icon: Award,
      label: "Vin le plus cher",
      value: mostExpensiveWine.name || "N/A",
      subtitle: mostExpensiveWine.price ? `${mostExpensiveWine.price} €` : "Prix non défini",
      color: "yellow"
    },
    {
      icon: Target,
      label: "Type dominant",
      value: topColor ? topColor[0] : "N/A",
      subtitle: topColor ? `${topColor[1]} bouteilles (${Math.round(topColor[1]/totalBottles*100)}%)` : "",
      color: "red"
    },
    {
      icon: Wine,
      label: "Producteur principal",
      value: topProducer ? topProducer[0] : "N/A",
      subtitle: topProducer ? `${topProducer[1]} bouteilles` : "",
      color: "indigo"
    }
  ];

  /**
   * Retourne les classes CSS appropriées pour chaque couleur de statistique
   * @param {string} color - Couleur de la statistique
   * @returns {string} Classes CSS pour l'icône colorée
   */
  const getColorClasses = (color) => {
    const colors = {
      green: "bg-green-100 text-green-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      yellow: "bg-yellow-100 text-yellow-600",
      red: "bg-red-100 text-red-600",
      indigo: "bg-indigo-100 text-indigo-600"
    };
    return colors[color] || "bg-gray-100 text-gray-600";
  };

  /**
   * Retourne l'icône de tendance appropriée selon l'état
   * @param {string} trend - Type de tendance (up, down, stable)
   * @returns {JSX.Element} Composant d'icône avec couleur appropriée
   */
  const getTrendIcon = (trend) => {
    switch(trend) {
      case "up": return <TrendingUp className="w-3 h-3 text-green-500" />;
      case "down": return <TrendingDown className="w-3 h-3 text-red-500" />;
      default: return <Target className="w-3 h-3 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Statistics */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Vue d'ensemble</h2>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainStats.map((stat, index) => (
              <div key={index} className="p-4 rounded-lg border hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-xl ${getColorClasses(stat.color)}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  {getTrendIcon(stat.trend)}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Détails de la collection</h2>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {detailedStats.map((stat, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border">
                <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900 mb-1 truncate" title={stat.value}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Distribution Overview */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Répartition rapide</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Colors */}
              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">Par type de vin</h4>
                <div className="space-y-2">
                  {Object.entries(colorCounts)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 4)
                    .map(([color, count]) => (
                      <div key={color} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{color}</span>
                        <Badge variant="outline" className="text-xs">
                          {count} ({Math.round(count/totalBottles*100)}%)
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>

              {/* Regions */}
              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">Par région</h4>
                <div className="space-y-2">
                  {Object.entries(regionCounts)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 4)
                    .map(([region, count]) => (
                      <div key={region} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 truncate" title={region}>{region}</span>
                        <Badge variant="outline" className="text-xs ml-2">
                          {count}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>

              {/* Producers */}
              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">Par producteur</h4>
                <div className="space-y-2">
                  {Object.entries(producerCounts)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 4)
                    .map(([producer, count]) => (
                      <div key={producer} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 truncate" title={producer}>{producer}</span>
                        <Badge variant="outline" className="text-xs ml-2">
                          {count}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;