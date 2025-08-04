import { 
  Lightbulb, 
  AlertTriangle, 
  TrendingUp, 
  Star,
  Target,
  Clock,
  DollarSign,
  Award
} from "lucide-react";
import { Badge } from "../ui/badge";

const StatsInsights = ({ bottles }) => {
  // Calculate insights and recommendations
  const totalBottles = bottles.reduce((sum, bottle) => sum + bottle.quantity, 0);
  const totalValue = bottles.reduce((sum, bottle) => sum + (bottle.price || 0) * bottle.quantity, 0);
  const averagePrice = totalBottles > 0 ? totalValue / totalBottles : 0;
  
  // Age analysis
  const currentYear = new Date().getFullYear();
  const vintages = bottles.map(bottle => bottle.year).filter(Boolean);
  const averageAge = currentYear - (vintages.reduce((sum, year) => sum + year, 0) / vintages.length);
  
  // Collection analysis
  const colorCounts = bottles.reduce((acc, bottle) => {
    acc[bottle.color] = (acc[bottle.color] || 0) + bottle.quantity;
    return acc;
  }, {});
  
  const regionCounts = bottles.reduce((acc, bottle) => {
    if (bottle.region) {
      acc[bottle.region] = (acc[bottle.region] || 0) + bottle.quantity;
    }
    return acc;
  }, {});

  // Generate dynamic insights based on data
  const generateInsights = () => {
    const insights = [];
    
    // Collection size insights
    if (totalBottles < 10) {
      insights.push({
        type: "recommendation",
        icon: TrendingUp,
        title: "Développez votre collection",
        description: "Votre cave compte moins de 10 bouteilles. C'est un excellent début ! Considérez l'ajout de quelques vins de différentes régions pour diversifier votre collection.",
        priority: "medium"
      });
    } else if (totalBottles > 100) {
      insights.push({
        type: "achievement",
        icon: Award,
        title: "Belle collection !",
        description: `Félicitations ! Avec ${totalBottles} bouteilles, vous avez constitué une collection impressionnante. Pensez à optimiser votre système de rangement.`,
        priority: "high"
      });
    }

    // Price insights
    if (averagePrice > 50) {
      insights.push({
        type: "achievement",
        icon: Star,
        title: "Collection haut de gamme",
        description: `Votre prix moyen de ${Math.round(averagePrice)}€ par bouteille indique une collection de qualité supérieure.`,
        priority: "high"
      });
    } else if (averagePrice < 15) {
      insights.push({
        type: "recommendation",
        icon: DollarSign,
        title: "Opportunité d'investissement",
        description: "Votre collection a un excellent rapport qualité-prix. Considérez l'ajout de quelques cuvées premium pour diversifier.",
        priority: "medium"
      });
    }

    // Diversity insights
    const colorDiversity = Object.keys(colorCounts).length;
    if (colorDiversity === 1) {
      insights.push({
        type: "recommendation",
        icon: Target,
        title: "Diversifiez vos types de vin",
        description: "Votre collection se compose d'un seul type de vin. Explorez d'autres couleurs pour enrichir vos expériences de dégustation.",
        priority: "high"
      });
    } else if (colorDiversity >= 4) {
      insights.push({
        type: "achievement",
        icon: Star,
        title: "Collection bien diversifiée",
        description: `Excellent ! Vous avez ${colorDiversity} types de vins différents dans votre cave.`,
        priority: "medium"
      });
    }

    // Age insights
    if (averageAge > 20) {
      insights.push({
        type: "warning",
        icon: Clock,
        title: "Vins matures à surveiller",
        description: `L'âge moyen de vos vins est de ${Math.round(averageAge)} ans. Certains pourraient être à leur apogée ou la dépasser.`,
        priority: "high"
      });
    } else if (averageAge < 5) {
      insights.push({
        type: "info",
        icon: Clock,
        title: "Collection jeune",
        description: "Vos vins sont encore jeunes. Ils gagneront en complexité avec le temps !",
        priority: "low"
      });
    }

    // Regional diversity
    const regionDiversity = Object.keys(regionCounts).length;
    if (regionDiversity === 1) {
      insights.push({
        type: "recommendation",
        icon: Target,
        title: "Explorez de nouvelles régions",
        description: "Votre collection se concentre sur une seule région. Découvrez d'autres terroirs pour enrichir votre palais.",
        priority: "medium"
      });
    } else if (regionDiversity >= 5) {
      insights.push({
        type: "achievement",
        icon: Award,
        title: "Exploration géographique remarquable",
        description: `Bravo ! Vous explorez ${regionDiversity} régions différentes.`,
        priority: "medium"
      });
    }

    // Value insights
    if (totalValue > 5000) {
      insights.push({
        type: "warning",
        icon: AlertTriangle,
        title: "Collection de valeur élevée",
        description: `Votre collection vaut ${Math.round(totalValue).toLocaleString()}€. Assurez-vous d'avoir une bonne assurance et un stockage optimal.`,
        priority: "high"
      });
    }

    return insights.slice(0, 6); // Limit to 6 insights
  };

  const insights = generateInsights();

  const getInsightStyle = (type) => {
    const styles = {
      achievement: {
        bg: "bg-green-50 border-green-200",
        icon: "text-green-600",
        badge: "bg-green-100 text-green-800"
      },
      recommendation: {
        bg: "bg-blue-50 border-blue-200",
        icon: "text-blue-600",
        badge: "bg-blue-100 text-blue-800"
      },
      warning: {
        bg: "bg-yellow-50 border-yellow-200",
        icon: "text-yellow-600",
        badge: "bg-yellow-100 text-yellow-800"
      },
      info: {
        bg: "bg-gray-50 border-gray-200",
        icon: "text-gray-600",
        badge: "bg-gray-100 text-gray-800"
      }
    };
    return styles[type] || styles.info;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      high: "Important",
      medium: "Modéré",
      low: "Info"
    };
    return labels[priority] || "Info";
  };

  // Collection health score
  const calculateHealthScore = () => {
    let score = 0;
    let maxScore = 0;

    // Diversity (40 points max)
    maxScore += 40;
    score += Math.min(Object.keys(colorCounts).length * 8, 32); // Max 4 colors * 8 = 32
    score += Math.min(Object.keys(regionCounts).length * 2, 8); // Max 4 regions * 2 = 8

    // Age balance (30 points max)
    maxScore += 30;
    if (averageAge >= 5 && averageAge <= 15) score += 30; // Sweet spot
    else if (averageAge >= 3 && averageAge <= 20) score += 20;
    else score += 10;

    // Collection size (20 points max)
    maxScore += 20;
    if (totalBottles >= 20 && totalBottles <= 100) score += 20; // Sweet spot
    else if (totalBottles >= 10 && totalBottles <= 200) score += 15;
    else if (totalBottles >= 5) score += 10;
    else score += 5;

    // Price balance (10 points max)
    maxScore += 10;
    if (averagePrice >= 20 && averagePrice <= 80) score += 10; // Good balance
    else if (averagePrice >= 15 && averagePrice <= 120) score += 7;
    else score += 5;

    return Math.round((score / maxScore) * 100);
  };

  const healthScore = calculateHealthScore();
  const getHealthColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="space-y-6">
      {/* Collection Health Score */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Score de santé de la collection</h2>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className={`p-4 rounded-full ${getHealthColor(healthScore)}`}>
              <Star className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{healthScore}/100</h3>
                <Badge variant="outline" className={getHealthColor(healthScore)}>
                  {healthScore >= 80 ? "Excellente" : healthScore >= 60 ? "Bonne" : "À améliorer"}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    healthScore >= 80 ? "bg-green-500" : 
                    healthScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${healthScore}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                Score basé sur la diversité, l'équilibre des âges, la taille de collection et la gamme de prix
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-800">Conseils et recommandations</h2>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          {insights.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {insights.map((insight, index) => {
                const style = getInsightStyle(insight.type);
                return (
                  <div key={index} className={`p-4 rounded-lg border ${style.bg}`}>
                    <div className="flex items-start space-x-3">
                      <insight.icon className={`w-6 h-6 mt-1 ${style.icon}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                          <Badge variant="outline" className={`text-xs ${style.badge}`}>
                            {getPriorityLabel(insight.priority)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucun conseil disponible pour le moment.</p>
              <p className="text-sm mt-1">Ajoutez plus de vins pour obtenir des recommandations personnalisées.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsInsights;