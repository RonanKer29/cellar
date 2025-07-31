import { Eye, Edit, Trash2, Wine } from "lucide-react";

const getColorClass = (color) => {
  switch (color) {
    case "Rouge":
      return "bg-[#FEE2E2]";
    case "Blanc":
      return "bg-[#FEF9C3]";
    case "Rosé":
      return "bg-pink-200";
    case "Pétillant":
      return "bg-[#DCFCE7]";
    default:
      return "bg-gray-300";
  }
};

const getIconColor = (color) => {
  switch (color) {
    case "Rouge":
      return "text-[#DC2626]";
    case "Blanc":
      return "text-[#CA8A04]";
    case "Pétillant":
      return "text-[#16A34A]";
    case "Rosé":
      return "text-pink-600";
    default:
      return "text-gray-400";
  }
};

const WineList = ({ bottles = [] }) => {
  if (!Array.isArray(bottles)) {
    return (
      <p className="text-center py-10 text-gray-600">
        Chargement des bouteilles...
      </p>
    );
  }

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
              <tr key={bottle.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="px-6 py-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-xl ${getColorClass(
                        bottle.color
                      )}`}
                    >
                      <Wine
                        className={`w-6 h-6 ${getIconColor(bottle.color)}`}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {bottle.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {bottle.description || "-"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{bottle.year}</td>
                <td className="px-6 py-4 text-gray-700">{bottle.country}</td>
                <td className="px-6 py-4 text-gray-700">{bottle.region}</td>
                <td className="px-6 py-4 text-gray-700">{bottle.quantity}</td>
                <td className="px-6 py-4 text-gray-700">
                  {bottle.value ? `${bottle.value} €` : "-"}
                </td>
                <td className="px-6 py-6 flex space-x-3 text-gray-600">
                  <button title="Voir">
                    <Eye className="h-4 w-4 text-pink-700" />
                  </button>
                  <button title="Éditer">
                    <Edit className="h-4 w-4 text-blue-700" />
                  </button>
                  <button title="Supprimer">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </td>
              </tr>
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
              <tr key={bottle.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="px-4 py-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-xl ${getColorClass(
                        bottle.color
                      )}`}
                    >
                      <Wine
                        className={`w-5 h-5 ${getIconColor(bottle.color)}`}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {bottle.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {bottle.value ? `${bottle.value} €` : "-"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-700">{bottle.year}</td>
                <td className="px-4 py-4 text-gray-700">
                  <div>
                    <p className="text-sm">{bottle.country}</p>
                    <p className="text-xs text-gray-500">{bottle.region}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-700">{bottle.quantity}</td>
                <td className="px-4 py-6 flex space-x-2 text-gray-600">
                  <button title="Voir">
                    <Eye className="h-4 w-4 text-pink-700" />
                  </button>
                  <button title="Éditer">
                    <Edit className="h-4 w-4 text-blue-700" />
                  </button>
                  <button title="Supprimer">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-200">
          {bottles.map((bottle) => (
            <div key={bottle.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-xl flex-shrink-0 ${getColorClass(
                    bottle.color
                  )}`}
                >
                  <Wine className={`w-6 h-6 ${getIconColor(bottle.color)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base">
                        {bottle.name}
                      </h3>
                      {bottle.description && (
                        <p className="text-gray-400 text-sm mt-1">
                          {bottle.description}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-2">
                      <button title="Voir">
                        <Eye className="h-4 w-4 text-pink-700" />
                      </button>
                      <button title="Éditer">
                        <Edit className="h-4 w-4 text-blue-700" />
                      </button>
                      <button title="Supprimer">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
                    <div>
                      <span className="text-gray-500">Millésime:</span>
                      <span className="ml-1 text-gray-700">{bottle.year}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Quantité:</span>
                      <span className="ml-1 text-gray-700">
                        {bottle.quantity}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Pays:</span>
                      <span className="ml-1 text-gray-700">
                        {bottle.country}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Valeur:</span>
                      <span className="ml-1 text-gray-700">
                        {bottle.value ? `${bottle.value} €` : "-"}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Région:</span>
                      <span className="ml-1 text-gray-700">
                        {bottle.region}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
