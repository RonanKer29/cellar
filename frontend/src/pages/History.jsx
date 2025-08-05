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
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
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
    .filter((bottle) => bottle.status === "En cave")
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
        theme="indigo"
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

      {/* Timeline des événements récents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Activité récente (30 derniers jours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Wine className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune activité récente</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentEvents.slice(0, 10).map((event, index) => (
                <div
                  key={event.id}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`p-2 rounded-full ${
                      event.type === EVENT_TYPES.CONSUMED
                        ? "bg-purple-100 text-purple-600"
                        : event.type === EVENT_TYPES.ADDED
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {event.type === EVENT_TYPES.CONSUMED ? (
                      <Wine className="w-4 h-4" />
                    ) : event.type === EVENT_TYPES.ADDED ? (
                      <Plus className="w-4 h-4" />
                    ) : (
                      <Minus className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {event.bottleName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {event.bottleProductor} • {event.bottleYear}
                    </p>
                  </div>
                  {event.quantity > 1 && (
                    <Badge variant="secondary" className="text-xs">
                      {event.quantity}x
                    </Badge>
                  )}
                  <div className="text-right">
                    <Badge
                      variant={
                        event.type === EVENT_TYPES.CONSUMED
                          ? "destructive"
                          : event.type === EVENT_TYPES.ADDED
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {event.type === EVENT_TYPES.CONSUMED
                        ? "Dégusté"
                        : event.type === EVENT_TYPES.ADDED
                        ? "Ajouté"
                        : "Supprimé"}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(event.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
