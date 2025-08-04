import { Eye, Edit, Trash2, Wine } from "lucide-react";
import { Link } from "react-router-dom";
import { getWineColorClass, getWineIconColor } from "../../utils/wineUtils";

const WineItem = ({ bottle, onDelete, viewMode = "desktop" }) => {
  const handleDelete = () => {
    if (window.confirm("Supprimer ce vin ?")) {
      onDelete(bottle.id);
    }
  };

  const ActionButtons = () => (
    <div className="flex space-x-2 text-gray-600">
      <Link to={`/bouteille/${bottle.id}`} title="Voir">
        <Eye className="h-4 w-4 text-pink-700 hover:scale-110 transition" />
      </Link>
      <Link to={`/bouteille/${bottle.id}/edit`} title="Éditer">
        <Edit className="h-4 w-4 text-blue-700 hover:scale-110 transition" />
      </Link>
      <button title="Supprimer" onClick={handleDelete}>
        <Trash2 className="h-4 w-4 text-red-500 hover:scale-110 transition" />
      </button>
    </div>
  );

  if (viewMode === "mobile") {
    return (
      <div className="p-4 hover:bg-gray-50">
        <div className="flex items-start space-x-3">
          <div
            className={`p-2 rounded-xl flex-shrink-0 ${getWineColorClass(
              bottle.color
            )}`}
          >
            <Wine className={`w-6 h-6 ${getWineIconColor(bottle.color)}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link to={`/bouteille/${bottle.id}`}>
                  <h3 className="font-semibold text-gray-900 text-base hover:underline">
                    {bottle.name}
                  </h3>
                </Link>
              </div>
              <div className="flex space-x-2 ml-2">
                <ActionButtons />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
              <div>
                <span className="text-gray-500">Millésime:</span>
                <span className="ml-1 text-gray-700">{bottle.year}</span>
              </div>
              <div>
                <span className="text-gray-500">Quantité:</span>
                <span className="ml-1 text-gray-700">{bottle.quantity}</span>
              </div>
              <div>
                <span className="text-gray-500">Pays:</span>
                <span className="ml-1 text-gray-700">{bottle.country}</span>
              </div>
              <div>
                <span className="text-gray-500">Valeur:</span>
                <span className="ml-1 text-gray-700">
                  {bottle.price ? `${bottle.price} €` : "-"}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Région:</span>
                <span className="ml-1 text-gray-700">{bottle.region}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === "tablet") {
    return (
      <tr className="border-b hover:bg-gray-50 text-sm">
        <td className="px-4 py-4">
          <Link to={`/bouteille/${bottle.id}`}>
            <div className="flex items-start space-x-3 group cursor-pointer">
              <div
                className={`p-2 rounded-xl ${getWineColorClass(bottle.color)}`}
              >
                <Wine
                  className={`w-5 h-5 ${getWineIconColor(bottle.color)}`}
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm group-hover:underline">
                  {bottle.name}
                </p>
                <p className="text-gray-400 text-xs">
                  {bottle.price ? `${bottle.price} €` : "-"}
                </p>
              </div>
            </div>
          </Link>
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
          <ActionButtons />
        </td>
      </tr>
    );
  }

  // Desktop view (default)
  return (
    <tr className="border-b hover:bg-gray-50 text-sm">
      <td className="px-6 py-4">
        <Link to={`/bouteille/${bottle.id}`}>
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div
              className={`p-2 rounded-xl ${getWineColorClass(bottle.color)}`}
            >
              <Wine className={`w-6 h-6 ${getWineIconColor(bottle.color)}`} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 group-hover:underline">
                {bottle.name}
              </p>
            </div>
          </div>
        </Link>
      </td>
      <td className="px-6 py-4 text-gray-700">{bottle.year}</td>
      <td className="px-6 py-4 text-gray-700">{bottle.country}</td>
      <td className="px-6 py-4 text-gray-700">{bottle.region}</td>
      <td className="px-6 py-4 text-gray-700">{bottle.quantity}</td>
      <td className="px-6 py-4 text-gray-700">
        {bottle.price ? `${bottle.price} €` : "-"}
      </td>
      <td className="px-6 py-6 flex space-x-3 text-gray-600">
        <ActionButtons />
      </td>
    </tr>
  );
};

export default WineItem;