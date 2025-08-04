import { useNavigate } from "react-router-dom";
import WineCard from "./WineCard";
import WineListView from "./WineListView";

const MaCaveGrid = ({ bottles, viewMode }) => {
  const navigate = useNavigate();
  
  const handleWineClick = (bottle) => {
    navigate(`/bouteille/${bottle.id}`);
  };

  if (bottles.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun vin trouvé</h3>
          <p className="text-gray-500">
            Aucune bouteille ne correspond à vos critères de recherche.
            <br />
            Essayez de modifier vos filtres ou d'ajouter de nouveaux vins à votre collection.
          </p>
        </div>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <WineListView 
        bottles={bottles} 
        onWineClick={handleWineClick}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {bottles.map((bottle) => (
        <WineCard 
          key={bottle.id} 
          bottle={bottle} 
          onClick={() => handleWineClick(bottle)}
        />
      ))}
    </div>
  );
};

export default MaCaveGrid;