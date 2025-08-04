/**
 * @fileoverview Composant principal d'affichage de la collection de vins
 * Gère l'affichage en grille ou en liste selon le mode de vue sélectionné
 */

import { useNavigate } from "react-router-dom";
import WineCard from "./WineCard";
import WineListView from "./WineListView";

/**
 * Conteneur principal pour l'affichage de la collection de vins
 * Adapte automatiquement l'affichage selon le mode de vue (grille/liste)
 * et affiche un message approprié si aucune bouteille n'est trouvée
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Array<Object>} props.bottles - Liste des bouteilles à afficher
 * @param {string} props.viewMode - Mode d'affichage ("grid" pour grille, "list" pour liste)
 * 
 * @example
 * <MaCaveGrid 
 *   bottles={[
 *     { id: 1, name: "Château Margaux", year: 2015, color: "Rouge" },
 *     { id: 2, name: "Sancerre", year: 2020, color: "Blanc" }
 *   ]}
 *   viewMode="grid"
 * />
 * 
 * @returns {JSX.Element} Grille de cartes de vins, vue liste ou message d'état vide
 */
const MaCaveGrid = ({ bottles, viewMode }) => {
  const navigate = useNavigate();
  
  /**
   * Navigue vers la page de détail d'une bouteille spécifique
   * @param {Object} bottle - La bouteille sélectionnée
   * @param {number} bottle.id - L'identifiant unique de la bouteille
   */
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