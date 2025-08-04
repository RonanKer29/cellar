import Dashboard from "../components/dashboard/Dashboard";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import { useWines } from "../hooks/useWines";

const Home = () => {
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

  return (
    <div className="p-4">
      <Dashboard bottles={bottles} />
    </div>
  );
};

export default Home;
