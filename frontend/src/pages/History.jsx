/**
 * @fileoverview Page d'historique et traçabilité de la cave à vin
 * Affiche l'évolution de la collection, les entrées et sorties de bouteilles
 */

import { useWines } from "../hooks/useWines";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import ColorfulPageHeader from "../components/common/ColorfulPageHeader";
import {
  getHistory,
  getRecentHistory,
  getMonthlyConsumptionStats,
  migrateFromBottles,
  EVENT_TYPES,
} from "../services/historyService";
import {
  History as HistoryIcon,
  TrendingUp,
  TrendingDown,
  Calendar,
  Wine,
  Plus,
  Minus,
  BarChart3,
  Package,
  MapPin,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import StatCard from "../components/dashboard/StatCard";

/**
 * Page d'historique et traçabilité complète de la cave
 * Présente l'évolution temporelle de la collection avec statistiques détaillées
 *
 * @returns {JSX.Element} Interface d'historique avec timeline et statistiques
 */
const History = () => {
  const { bottles, loading, error, refetch } = useWines();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message="Une erreur est survenue lors du chargement"
        error={error}
        onRetry={refetch}
      />
    );
  }

  // Migration initiale des données si nécessaire
  if (bottles.length > 0) {
    migrateFromBottles(bottles);
  }

  // Récupération des données d'historique
  const allHistory = getHistory();
  const recentEvents = getRecentHistory(30);
  const monthlyConsumptions = getMonthlyConsumptionStats(12);

  // Calcul des ajouts mensuels depuis l'historique réel
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthlyAdditions = [];
  for (let i = 11; i >= 0; i--) {
    const targetDate = new Date(currentYear, currentMonth - i, 1);
    const monthEvents = allHistory.filter((event) => {
      if (event.type !== EVENT_TYPES.ADDED) return false;
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === targetDate.getFullYear() &&
        eventDate.getMonth() === targetDate.getMonth()
      );
    });

    monthlyAdditions.push({
      month: targetDate.toLocaleDateString("fr-FR", {
        month: "short",
        year: "numeric",
      }),
      count: monthEvents.reduce((sum, event) => sum + event.quantity, 0),
      events: monthEvents,
    });
  }

  // Statistiques générales depuis l'historique
  const totalAdded = allHistory
    .filter((event) => event.type === EVENT_TYPES.ADDED)
    .reduce((sum, event) => sum + event.quantity, 0);
  const totalConsumed = allHistory
    .filter((event) => event.type === EVENT_TYPES.CONSUMED)
    .reduce((sum, event) => sum + event.quantity, 0);
  const currentStock = bottles
    .filter((bottle) => (bottle.quantity || 0) > 0)
    .reduce((sum, bottle) => sum + bottle.quantity, 0);

  // Bouteilles ajoutées ce mois
  const thisMonthAdded = monthlyAdditions[11]?.count || 0;
  const lastMonthAdded = monthlyAdditions[10]?.count || 0;
  const additionTrend = thisMonthAdded >= lastMonthAdded ? "up" : "down";

  // Bouteilles consommées ce mois
  const thisMonthConsumed = monthlyConsumptions[11]?.count || 0;
  const lastMonthConsumed = monthlyConsumptions[10]?.count || 0;
  const consumptionTrend =
    thisMonthConsumed >= lastMonthConsumed ? "up" : "down";

  // Les événements récents sont déjà récupérés depuis le service

  const stats = [
    {
      icon: Plus,
      title: "Total ajouté",
      value: totalAdded,
      subtitle: `${thisMonthAdded} ce mois-ci`,
      color: "green",
      trend: additionTrend,
    },
    {
      icon: Minus,
      title: "Total consommé",
      value: totalConsumed,
      subtitle: `${thisMonthConsumed} ce mois-ci`,
      color: "purple",
      trend: consumptionTrend,
    },
    {
      icon: Package,
      title: "Stock actuel",
      value: currentStock,
      subtitle: `${
        Math.round((currentStock / totalAdded) * 100) || 0
      }% du total`,
      color: "blue",
    },
    {
      icon: BarChart3,
      title: "Taux rotation",
      value: `${Math.round((totalConsumed / totalAdded) * 100) || 0}%`,
      subtitle: "Bouteilles dégustées",
      color: "pink",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <ColorfulPageHeader
        title="Historique"
        subtitle="Suivez l'évolution de votre cave à vin"
        icon={HistoryIcon}
        theme="green"
      />

      {/* Statistiques principales */}
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

      {/* Graphiques mensuels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ajouts mensuels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Entrées en cave (12 derniers mois)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyAdditions.slice(-6).map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    {month.month}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(
                            5,
                            (month.count /
                              Math.max(
                                ...monthlyAdditions.map((m) => m.count),
                                1
                              )) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="min-w-[40px] justify-center"
                    >
                      {month.count}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Consommations mensuelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-purple-600" />
              Dégustations (12 derniers mois)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyConsumptions.slice(-6).map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    {month.month}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(
                            5,
                            (month.count /
                              Math.max(
                                ...monthlyConsumptions.map((m) => m.count),
                                1
                              )) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="min-w-[40px] justify-center"
                    >
                      {month.count}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline détaillée des événements récents */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Activité récente
            </div>
            <Badge variant="outline" className="text-xs">
              {recentEvents.length} événement{recentEvents.length > 1 ? 's' : ''} (30j)
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentEvents.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Wine className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune activité récente</h3>
              <p className="text-sm">Les ajouts et dégustations des 30 derniers jours s'afficheront ici</p>
            </div>
          ) : (
            <div className="relative">
              {/* Ligne de timeline */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200"></div>
              
              <div className="space-y-6">
                {recentEvents.slice(0, 15).map((event, index) => {
                  const eventDate = new Date(event.date);
                  const isToday = eventDate.toDateString() === new Date().toDateString();
                  const isYesterday = eventDate.toDateString() === new Date(Date.now() - 86400000).toDateString();
                  
                  let dateLabel = eventDate.toLocaleDateString("fr-FR");
                  if (isToday) dateLabel = "Aujourd'hui";
                  else if (isYesterday) dateLabel = "Hier";
                  
                  return (
                    <div key={event.id} className="relative flex items-start space-x-4 group">
                      {/* Icône de timeline */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white transition-transform group-hover:scale-110 ${
                            event.type === EVENT_TYPES.CONSUMED
                              ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white"
                              : event.type === EVENT_TYPES.ADDED
                              ? "bg-gradient-to-br from-green-500 to-green-600 text-white"
                              : "bg-gradient-to-br from-red-500 to-red-600 text-white"
                          }`}
                        >
                          {event.type === EVENT_TYPES.CONSUMED ? (
                            <Wine className="w-5 h-5" />
                          ) : event.type === EVENT_TYPES.ADDED ? (
                            <Plus className="w-5 h-5" />
                          ) : (
                            <Minus className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                      
                      {/* Contenu de l'événement */}
                      <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            {/* En-tête avec action et timestamp */}
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge
                                variant={
                                  event.type === EVENT_TYPES.CONSUMED
                                    ? "destructive"
                                    : event.type === EVENT_TYPES.ADDED
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs font-semibold"
                              >
                                {event.type === EVENT_TYPES.CONSUMED
                                  ? "🍷 Dégusté"
                                  : event.type === EVENT_TYPES.ADDED
                                  ? "📦 Ajouté"
                                  : "🗑️ Supprimé"}
                              </Badge>
                              <span className="text-xs text-gray-500 font-medium">
                                {dateLabel} • {eventDate.toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            
                            {/* Informations du vin */}
                            <h4 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                              {event.bottleName}
                            </h4>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{event.bottleProductor}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{event.bottleYear}</span>
                              </span>
                            </div>
                            
                            {/* Détails additionnels */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs border-2 ${
                                    event.bottleColor === 'Rouge' ? 'border-red-300 text-red-700 bg-red-50' :
                                    event.bottleColor === 'Blanc' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                                    event.bottleColor === 'Rosé' ? 'border-pink-300 text-pink-700 bg-pink-50' :
                                    event.bottleColor === 'Pétillant' ? 'border-purple-300 text-purple-700 bg-purple-50' :
                                    'border-gray-300 text-gray-700 bg-gray-50'
                                  }`}
                                >
                                  {event.bottleColor}
                                </Badge>
                                {event.quantity > 1 && (
                                  <Badge variant="secondary" className="text-xs font-semibold">
                                    {event.quantity}x bouteille{event.quantity > 1 ? 's' : ''}
                                  </Badge>
                                )}
                              </div>
                              
                              {/* Actions */}
                              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 px-2 text-xs"
                                  onClick={() => window.location.href = `/bouteille/${event.bottleId}`}
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  Voir
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {recentEvents.length > 15 && (
                <div className="text-center mt-6 pt-4 border-t border-gray-200">
                  <Badge variant="secondary" className="text-xs">
                    +{recentEvents.length - 15} événement{recentEvents.length - 15 > 1 ? 's' : ''} de plus
                  </Badge>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
