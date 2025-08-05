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
import StatCard from "../dashboard/StatCard";

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
      title: "Valeur totale",
      value: `${Math.round(totalValue).toLocaleString()} €`,
      subtitle: `Prix moyen: ${Math.round(averagePrice)} €`,
      color: "green"
    },
    {
      icon: Wine,
      title: "Collection",
      value: `${totalBottles}`,
      subtitle: `${Object.keys(colorCounts).length} types différents`,
      color: "blue"
    },
    {
      icon: Calendar,
      title: "Millésimes",
      value: vintages.length > 0 ? `${oldestVintage} - ${newestVintage}` : "N/A",
      subtitle: `Âge moyen: ${Math.round(averageAge)} ans`,
      color: "purple"
    },
    {
      icon: MapPin,
      title: "Régions",
      value: Object.keys(regionCounts).length,
      subtitle: topRegion ? `${topRegion[0]} (${topRegion[1]} btl)` : "Aucune",
      color: "pink"
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
    <div className="space-y-8">
      {/* Header moderne */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Vue d'ensemble</h2>
        <p className="text-gray-600">Tableau de bord complet de votre collection</p>
      </div>
      
      {/* StatCards principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => (
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

      {/* Section des détails avancés */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Détails de la collection</h3>
            <p className="text-gray-600">Analyses approfondies de vos bouteilles</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-amber-600" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {detailedStats.map((stat, index) => {
            const themes = {
              yellow: { gradient: 'from-yellow-500 to-yellow-600', lightBg: 'bg-yellow-50', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
              red: { gradient: 'from-red-500 to-red-600', lightBg: 'bg-red-50', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
              indigo: { gradient: 'from-indigo-500 to-indigo-600', lightBg: 'bg-indigo-50', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' }
            };
            const theme = themes[stat.color] || themes.indigo;
            
            return (
              <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 hover:shadow-md transition-all duration-300">
                {/* Barre colorée */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient}`}></div>
                
                <div className="flex items-start space-x-4">
                  <div className={`${theme.iconBg} rounded-xl p-3 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 ${theme.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">{stat.label}</p>
                    <p className="text-lg font-black text-gray-900 mb-1 truncate" title={stat.value}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section répartition redesignée */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Répartition détaillée</h3>
            <p className="text-gray-600">Distribution par catégories</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Types de vin */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Wine className="w-5 h-5 text-purple-600" />
              Par type de vin
            </h4>
            <div className="space-y-3">
              {Object.entries(colorCounts)
                .sort(([,a], [,b]) => b - a)
                .map(([color, count]) => {
                  const percentage = Math.round(count/totalBottles*100);
                  const colorThemes = {
                    'Rouge': 'bg-red-500',
                    'Blanc': 'bg-yellow-400',
                    'Rosé': 'bg-pink-400',
                    'Pétillant': 'bg-purple-500'
                  };
                  const barColor = colorThemes[color] || 'bg-gray-400';
                  
                  return (
                    <div key={color} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">{color}</span>
                        <span className="text-gray-900 font-bold">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${barColor} h-2 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Régions */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Par région
            </h4>
            <div className="space-y-3">
              {Object.entries(regionCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([region, count]) => (
                  <div key={region} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                    <span className="text-gray-700 font-medium truncate flex-1 mr-2" title={region}>
                      {region}
                    </span>
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-xs">
                      {count} btl
                    </Badge>
                  </div>
                ))}
            </div>
          </div>

          {/* Producteurs */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Par producteur
            </h4>
            <div className="space-y-3">
              {Object.entries(producerCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([producer, count]) => (
                  <div key={producer} className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                    <span className="text-gray-700 font-medium truncate flex-1 mr-2" title={producer}>
                      {producer}
                    </span>
                    <Badge className="bg-green-600 hover:bg-green-700 text-xs">
                      {count} btl
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;