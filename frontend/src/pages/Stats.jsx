import { useWines } from "../hooks/useWines";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import StatsHeader from "../components/stats/StatsHeader";
import StatsOverview from "../components/stats/StatsOverview";
import StatsCharts from "../components/stats/StatsCharts";
import StatsInsights from "../components/stats/StatsInsights";

const Stats = () => {
  const { bottles, loading, error, refetch } = useWines();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState 
        message="Une erreur est survenue lors du chargement des statistiques" 
        error={error} 
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="p-4 space-y-6">
      <StatsHeader totalBottles={bottles.length} />
      <StatsOverview bottles={bottles} />
      <StatsCharts bottles={bottles} />
      <StatsInsights bottles={bottles} />
    </div>
  );
};

export default Stats;