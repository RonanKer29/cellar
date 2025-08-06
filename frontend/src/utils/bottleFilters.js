/**
 * Utilitaires de filtrage pour les bouteilles
 * Gère la logique de filtrage entre stock actuel et collection complète
 */

/**
 * Filtre les bouteilles selon différents critères de vue
 */
export const BOTTLE_VIEWS = {
  STOCK: 'stock',           // Seulement les bouteilles en stock (quantity > 0)
  COLLECTION: 'collection', // Toutes les bouteilles (pour traçabilité)
  CONSUMED: 'consumed',     // Seulement les bouteilles complètement consommées (quantity = 0)
  ALL: 'all'               // Toutes les bouteilles sans exception
};

/**
 * Filtre les bouteilles selon la vue demandée
 * @param {Array} bottles - Liste des bouteilles
 * @param {string} view - Type de vue (BOTTLE_VIEWS)
 * @returns {Array} Bouteilles filtrées
 */
export const filterBottlesByView = (bottles, view = BOTTLE_VIEWS.STOCK) => {
  if (!Array.isArray(bottles)) return [];
  
  switch (view) {
    case BOTTLE_VIEWS.STOCK:
      // Seulement les bouteilles disponibles en stock
      return bottles.filter(bottle => (bottle.quantity || 0) > 0);
      
    case BOTTLE_VIEWS.CONSUMED:
      // Seulement les bouteilles complètement consommées
      return bottles.filter(bottle => (bottle.quantity || 0) === 0);
      
    case BOTTLE_VIEWS.COLLECTION:
      // Toutes les bouteilles de la collection (pour traçabilité)
      // Exclut seulement les bouteilles vraiment supprimées (si applicable)
      return bottles.filter(bottle => bottle.status !== 'DELETED');
      
    case BOTTLE_VIEWS.ALL:
    default:
      return bottles;
  }
};

/**
 * Obtient le statut d'affichage d'une bouteille pour l'UI
 * @param {Object} bottle - La bouteille
 * @returns {Object} Informations de statut pour l'affichage
 */
export const getBottleDisplayStatus = (bottle) => {
  const quantity = bottle.quantity || 0;
  
  if (quantity === 0) {
    return {
      status: 'consumed',
      label: 'Entièrement consommée',
      badgeVariant: 'secondary',
      showInStock: false,
      opacity: 'opacity-60'
    };
  }
  
  if (quantity > 0) {
    return {
      status: 'in_stock',
      label: `${quantity} en stock`,
      badgeVariant: 'default',
      showInStock: true,
      opacity: 'opacity-100'
    };
  }
  
  return {
    status: 'unknown',
    label: 'Statut inconnu',
    badgeVariant: 'outline',
    showInStock: false,
    opacity: 'opacity-40'
  };
};

/**
 * Calcule les statistiques selon les différentes vues
 * @param {Array} bottles - Liste des bouteilles
 * @returns {Object} Statistiques par vue
 */
export const calculateBottleStatsByView = (bottles) => {
  const inStock = filterBottlesByView(bottles, BOTTLE_VIEWS.STOCK);
  const consumed = filterBottlesByView(bottles, BOTTLE_VIEWS.CONSUMED);
  const totalCollection = filterBottlesByView(bottles, BOTTLE_VIEWS.COLLECTION);
  
  return {
    inStock: {
      count: inStock.length,
      totalQuantity: inStock.reduce((sum, b) => sum + (b.quantity || 0), 0)
    },
    consumed: {
      count: consumed.length,
      // Pour les bouteilles consommées, on estime qu'elles avaient au moins 1 bouteille
      totalQuantity: consumed.length 
    },
    collection: {
      count: totalCollection.length,
      totalQuantity: totalCollection.reduce((sum, b) => {
        // Pour les bouteilles consommées, on compte au minimum 1
        return sum + Math.max(b.quantity || 0, b.quantity === 0 ? 1 : 0);
      }, 0)
    }
  };
};