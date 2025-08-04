import WineItem from "../common/WineItem";
import { apiService } from "../../services/api";

const WineList = ({ bottles = [] }) => {
  if (!Array.isArray(bottles)) {
    return (
      <p className="text-center py-10 text-gray-600">
        Chargement des bouteilles...
      </p>
    );
  }

  const handleDelete = async (id) => {
    try {
      await apiService.deleteBottle(id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting bottle:", error);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 border-b space-y-2 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-800">Ma collection</h2>
        <span className="text-sm text-gray-500">
          {bottles.length} bouteilles trouvées
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-sm text-gray-500 uppercase">
              <th className="px-6 py-3">Vin</th>
              <th className="px-6 py-3">Millésime</th>
              <th className="px-6 py-3">Pays</th>
              <th className="px-6 py-3">Région</th>
              <th className="px-6 py-3">Quantité</th>
              <th className="px-6 py-3">Valeur</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bottles.map((bottle) => (
              <WineItem
                key={bottle.id}
                bottle={bottle}
                onDelete={handleDelete}
                viewMode="desktop"
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet View - Simplified table */}
      <div className="hidden md:block lg:hidden overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-sm text-gray-500 uppercase">
              <th className="px-4 py-3">Vin</th>
              <th className="px-4 py-3">Millésime</th>
              <th className="px-4 py-3">Lieu</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bottles.map((bottle) => (
              <WineItem
                key={bottle.id}
                bottle={bottle}
                onDelete={handleDelete}
                viewMode="tablet"
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-200">
          {bottles.map((bottle) => (
            <WineItem
              key={bottle.id}
              bottle={bottle}
              onDelete={handleDelete}
              viewMode="mobile"
            />
          ))}
        </div>
      </div>

      {/* Responsive Pagination */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 text-sm text-gray-500 space-y-3 sm:space-y-0">
        <span className="text-center sm:text-left">
          Affichage de 1 à {bottles.length} sur {bottles.length} résultats
        </span>
        <div className="flex justify-center sm:justify-end space-x-1">
          <button className="px-2 sm:px-3 py-1 border rounded-md text-xs sm:text-sm">
            Précédent
          </button>
          <button className="px-2 sm:px-3 py-1 border rounded-md bg-gray-100 text-xs sm:text-sm">
            1
          </button>
          <button className="px-2 sm:px-3 py-1 border rounded-md text-xs sm:text-sm">
            2
          </button>
          <button className="px-2 sm:px-3 py-1 border rounded-md text-xs sm:text-sm">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default WineList;
