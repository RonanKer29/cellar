/**
 * Utilitaires pour la gestion et l'affichage des vins
 * 
 * Fournit des fonctions helper pour :
 * - Le style visuel des différents types de vins
 * - Le calcul de statistiques sur la cave
 * - La gestion des couleurs et icônes
 * 
 * @module wineUtils
 */

/**
 * Retourne la classe CSS de couleur de fond selon le type de vin
 * 
 * @param {string} color - Type de vin ('Rouge', 'Blanc', 'Rosé', 'Pétillant')
 * @returns {string} Classe Tailwind CSS pour la couleur de fond
 */
export const getWineColorClass = (color) => {
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

/**
 * Retourne la classe CSS de couleur d'icône selon le type de vin
 * 
 * @param {string} color - Type de vin ('Rouge', 'Blanc', 'Rosé', 'Pétillant')
 * @returns {string} Classe Tailwind CSS pour la couleur d'icône
 */
export const getWineIconColor = (color) => {
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

/**
 * Retourne le mapping des couleurs pour les cartes de statistiques
 * 
 * Définit les combinaisons de couleurs (icône + fond) pour les différentes
 * cartes de statistiques du dashboard.
 * 
 * @returns {Object} Mapping des couleurs avec iconColor et bgColor
 */
export const getStatCardColorMapping = () => ({
  purple: {
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  green: {
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  pink: {
    iconColor: "text-[#DB2777]",
    bgColor: "bg-[#FCE7F3]",
  },
  blue: {
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
});

/**
 * Calcule les statistiques globales de la cave à vin
 * 
 * Analyse la collection de bouteilles pour générer des statistiques
 * utiles pour le dashboard :
 * - Total des bouteilles (toutes quantités confondues)
 * - Stock actuel en cave
 * - Consommation de l'année en cours
 * - Nombre de régions différentes
 * - Acquisitions du mois en cours
 * 
 * @param {Array} bottles - Liste des bouteilles de l'utilisateur
 * @param {number} bottles[].quantity - Quantité de bouteilles identiques
 * @param {string} bottles[].status - Statut ('En cave' | 'Bue')
 * @param {string} bottles[].date_added - Date d'ajout ISO string
 * @param {string} bottles[].region - Région/Appellation du vin
 * @returns {Object} Statistiques calculées
 * @returns {number} returns.total - Nombre total de bouteilles
 * @returns {number} returns.inCellar - Bouteilles actuellement en cave
 * @returns {number} returns.drunkThisYear - Bouteilles bues cette année
 * @returns {number} returns.regionsCount - Nombre de régions différentes
 * @returns {number} returns.bottlesThisMonth - Bouteilles ajoutées ce mois
 */
export const calculateWineStats = (bottles) => {
  // Calcul du nombre total de bouteilles (somme des quantités)
  const total = bottles.reduce((acc, b) => acc + (b.quantity || 0), 0);
  
  // Calcul du stock actuel (bouteilles en cave uniquement)
  const inCellar = bottles
    .filter((b) => b.status === "En cave")
    .reduce((acc, b) => acc + (b.quantity || 0), 0);

  // Calcul de la consommation de l'année en cours
  const drunkThisYear = bottles
    .filter((b) => {
      const year = new Date(b.date_added).getFullYear();
      return b.status === "Bue" && year === new Date().getFullYear();
    })
    .reduce((acc, b) => acc + (b.quantity || 0), 0);

  // Extraction des régions uniques (en excluant les valeurs vides)
  const regions = [...new Set(bottles.map((b) => b.region))].filter(Boolean);

  // Calcul des acquisitions du mois en cours
  const now = new Date();
  const bottlesThisMonth = bottles
    .filter((b) => {
      const added = new Date(b.date_added);
      return (
        added.getMonth() === now.getMonth() &&
        added.getFullYear() === now.getFullYear()
      );
    })
    .reduce((acc, b) => acc + (b.quantity || 0), 0);

  return {
    total,
    inCellar,
    drunkThisYear,
    regionsCount: regions.length,
    bottlesThisMonth,
  };
};