import { useWines } from "../hooks/useWines";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import ColorfulPageHeader from "../components/common/ColorfulPageHeader";
import StatsOverview from "../components/stats/StatsOverview";
import StatsCharts from "../components/stats/StatsCharts";
import StatsInsights from "../components/stats/StatsInsights";
import { BarChart3, Download, TrendingUp, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

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

  // Fonction d'export (placeholder)
  const handleExportData = () => {
    alert("Fonctionnalité d'export à venir !");
  };

  // Actions pour le header
  const headerActions = (
    <Button 
      variant="outline" 
      onClick={handleExportData}
      className="flex items-center space-x-2"
    >
      <Download className="w-4 h-4" />
      <span>Exporter</span>
    </Button>
  );

  // Contenu du bas du header
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const headerBottomContent = (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
      <div className="flex items-center space-x-4">
        <Badge variant="secondary" className="text-sm flex items-center space-x-1">
          <TrendingUp className="w-3 h-3" />
          <span>{bottles.length} bouteilles analysées</span>
        </Badge>
      </div>
      
      <div className="flex items-center space-x-2 text-sm text-indigo-600/70">
        <Calendar className="w-4 h-4" />
        <span>Dernière mise à jour: {currentDate}</span>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      <ColorfulPageHeader
        title="Statistiques"
        subtitle="Analysez votre collection de vins en détail"
        icon={BarChart3}
        theme="indigo"
        actions={headerActions}
        bottomContent={headerBottomContent}
      />
      <StatsOverview bottles={bottles} />
      <StatsCharts bottles={bottles} />
      <StatsInsights bottles={bottles} />
    </div>
  );
};

export default Stats;