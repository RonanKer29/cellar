import { Eye, Edit, Trash2 } from "lucide-react";

const getColorClass = (color) => {
  switch (color) {
    case "Rouge":
      return "bg-red-200";
    case "Blanc":
      return "bg-green-200";
    case "Rosé":
      return "bg-pink-200";
    case "Pétillant":
      return "bg-yellow-200";
    default:
      return "bg-gray-300";
  }
};

const WineList = ({ bottles }) => {
  if (!Array.isArray(bottles)) {
    return (
      <p className="text-center py-10 text-gray-600">
        Chargement des bouteilles...
      </p>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Ma collection</h2>
        <span className="text-sm text-gray-500">
          {bottles.length} bouteilles trouvées
        </span>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr className="text-sm text-gray-500 uppercase">
            <th className="px-6 py-3">Vin</th>
            <th className="px-6 py-3">Couleur</th>
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
            <tr key={bottle.id} className="border-b hover:bg-gray-50 text-sm">
              <td className="px-6 py-4">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full mt-1 ${getColorClass(
                      bottle.color
                    )}`}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900">{bottle.name}</p>
                    <p className="text-gray-400 text-xs">
                      {bottle.description || "-"}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700">{bottle.color}</td>
              <td className="px-6 py-4 text-gray-700">{bottle.year}</td>
              <td className="px-6 py-4 text-gray-700">{bottle.country}</td>
              <td className="px-6 py-4 text-gray-700">{bottle.region}</td>
              <td className="px-6 py-4 text-gray-700">{bottle.quantity}</td>
              <td className="px-6 py-4 text-gray-700">
                {bottle.value ? `${bottle.value} €` : "-"}
              </td>
              <td className="px-6 py-4 flex space-x-3 text-gray-600">
                <button title="Voir">
                  <Eye className="h-4 w-4" />
                </button>
                <button title="Éditer">
                  <Edit className="h-4 w-4" />
                </button>
                <button title="Supprimer">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination statique */}
      <div className="flex justify-between items-center px-6 py-4 text-sm text-gray-500">
        <span>
          Affichage de 1 à {bottles.length} sur {bottles.length} résultats
        </span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded-md">Précédent</button>
          <button className="px-3 py-1 border rounded-md bg-gray-100">1</button>
          <button className="px-3 py-1 border rounded-md">2</button>
          <button className="px-3 py-1 border rounded-md">Suivant</button>
        </div>
      </div>
    </div>
  );
};

export default WineList;
