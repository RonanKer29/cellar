/**
 * @fileoverview Composant de visualisation des données de la cave à vin
 * Fournit des graphiques interactifs pour analyser la collection par différents critères
 */

import { useState } from "react";
import { BarChart, PieChart, TrendingUp, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

/**
 * Composant de graphiques statistiques interactifs pour l'analyse de la cave
 * Offre plusieurs vues de données avec graphiques en barres horizontales
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Array<Object>} props.bottles - Collection complète des bouteilles
 * @param {string} props.bottles[].color - Type de vin (Rouge, Blanc, Rosé, Pétillant)
 * @param {string} props.bottles[].region - Région viticole
 * @param {number} props.bottles[].year - Millésime
 * @param {number} props.bottles[].price - Prix unitaire
 * @param {number} props.bottles[].quantity - Quantité en stock
 * 
 * @example
 * <StatsCharts bottles={bottlesData} />
 * 
 * @returns {JSX.Element} Interface de graphiques avec sélecteur de vue et visualisations
 */
const StatsCharts = ({ bottles }) => {
  const [activeChart, setActiveChart] = useState("colors");

  // Data preparation for different chart types
  const colorData = bottles.reduce((acc, bottle) => {
    acc[bottle.color] = (acc[bottle.color] || 0) + bottle.quantity;
    return acc;
  }, {});

  const regionData = bottles.reduce((acc, bottle) => {
    if (bottle.region) {
      acc[bottle.region] = (acc[bottle.region] || 0) + bottle.quantity;
    }
    return acc;
  }, {});

  const yearData = bottles.reduce((acc, bottle) => {
    if (bottle.year) {
      const decade = Math.floor(bottle.year / 10) * 10;
      const decadeLabel = `${decade}s`;
      acc[decadeLabel] = (acc[decadeLabel] || 0) + bottle.quantity;
    }
    return acc;
  }, {});

  const priceRangeData = bottles.reduce((acc, bottle) => {
    const price = bottle.price || 0;
    let range;
    if (price === 0) range = "Non défini";
    else if (price < 20) range = "< 20€";
    else if (price < 50) range = "20-50€";
    else if (price < 100) range = "50-100€";
    else if (price < 200) range = "100-200€";
    else range = "> 200€";
    
    acc[range] = (acc[range] || 0) + bottle.quantity;
    return acc;
  }, {});

  const charts = {
    colors: {
      title: "Répartition par type de vin",
      data: colorData,
      icon: PieChart,
      colors: {
        "Rouge": "bg-red-500",
        "Blanc": "bg-yellow-400",
        "Rosé": "bg-pink-400",
        "Champagne": "bg-amber-300",
        "Pétillant": "bg-blue-400",
        "Autres": "bg-gray-400"
      }
    },
    regions: {
      title: "Répartition par région",
      data: regionData,
      icon: BarChart,
      colors: {}
    },
    decades: {
      title: "Répartition par décennie",
      data: yearData,
      icon: Calendar,
      colors: {}
    },
    prices: {
      title: "Répartition par gamme de prix",
      data: priceRangeData,
      icon: TrendingUp,
      colors: {
        "Non défini": "bg-gray-400",
        "< 20€": "bg-green-400",
        "20-50€": "bg-yellow-400",
        "50-100€": "bg-orange-400",
        "100-200€": "bg-red-400",
        "> 200€": "bg-purple-500"
      }
    }
  };

  const currentChart = charts[activeChart];
  const totalBottles = bottles.reduce((sum, bottle) => sum + bottle.quantity, 0);

  /**
   * Composant de graphique en barres horizontales
   * Affiche les données sous forme de barres avec pourcentages et valeurs
   * @param {Object} data - Données à afficher (clé: valeur)
   * @param {Object} colors - Mapping des couleurs par clé
   * @param {number} total - Total pour calcul des pourcentages
   * @returns {JSX.Element} Graphique en barres horizontales
   */
  const HorizontalBarChart = ({ data, colors = {}, total }) => {
    const sortedData = Object.entries(data)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8); // Show top 8 items

    const maxValue = Math.max(...sortedData.map(([,value]) => value));

    /**
     * Détermine la couleur de la barre selon la clé ou l'index
     * @param {string} key - Clé de la donnée
     * @param {number} index - Index dans la liste
     * @returns {string} Classe CSS de couleur
     */
    const getBarColor = (key, index) => {
      if (colors[key]) return colors[key];
      const defaultColors = [
        "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500",
        "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-gray-500"
      ];
      return defaultColors[index % defaultColors.length];
    };

    return (
      <div className="space-y-3">
        {sortedData.map(([key, value], index) => {
          const percentage = (value / total * 100).toFixed(1);
          const barWidth = (value / maxValue * 100);
          
          return (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 font-medium truncate" title={key}>
                  {key}
                </span>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {value} ({percentage}%)
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getBarColor(key, index)}`}
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      {/* Header with Chart Selector */}
      <div className="px-4 sm:px-6 py-4 border-b">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          <h2 className="text-lg font-semibold text-gray-800">Visualisations</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(charts).map(([key, chart]) => (
              <Button
                key={key}
                variant={activeChart === key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveChart(key)}
                className="flex items-center space-x-1"
              >
                <chart.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{chart.title.split(' ')[2] || chart.title.split(' ')[1]}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <currentChart.icon className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">{currentChart.title}</h3>
          </div>
          
          {Object.keys(currentChart.data).length > 0 ? (
            <HorizontalBarChart 
              data={currentChart.data} 
              colors={currentChart.colors}
              total={totalBottles}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BarChart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucune donnée disponible pour ce graphique</p>
            </div>
          )}
        </div>

        {/* Summary Stats for Current Chart */}
        {Object.keys(currentChart.data).length > 0 && (
          <div className="border-t pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.keys(currentChart.data).length}
                </p>
                <p className="text-xs text-gray-600">Catégories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...Object.values(currentChart.data))}
                </p>
                <p className="text-xs text-gray-600">Maximum</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(Object.values(currentChart.data).reduce((a, b) => a + b, 0) / Object.keys(currentChart.data).length)}
                </p>
                <p className="text-xs text-gray-600">Moyenne</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.entries(currentChart.data).sort(([,a], [,b]) => b - a)[0]?.[0]?.slice(0, 8) || "N/A"}
                </p>
                <p className="text-xs text-gray-600">Dominant</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCharts;