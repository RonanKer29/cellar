/**
 * Hooks personnalisés pour la gestion des bouteilles de vin
 * 
 * Fournit des hooks React pour gérer l'état et les opérations CRUD
 * sur les bouteilles de vin avec gestion automatique du cache local.
 * 
 * @module useWines
 * @requires React
 * @requires apiService
 */
import { useState, useEffect } from "react";
import { apiService } from "../services/api";

/**
 * Hook pour gérer la collection complète de bouteilles
 * 
 * Fournit un accès complet à la cave de l'utilisateur avec :
 * - Chargement automatique des bouteilles
 * - Opérations CRUD avec mise à jour du cache local
 * - Gestion des états de chargement et d'erreur
 * - Fonction de rechargement manuel
 * 
 * @returns {Object} Interface de gestion des bouteilles
 * @returns {Array} returns.bottles - Liste des bouteilles
 * @returns {boolean} returns.loading - Indicateur de chargement
 * @returns {string|null} returns.error - Message d'erreur éventuel
 * @returns {Function} returns.refetch - Recharge les données depuis l'API
 * @returns {Function} returns.addBottle - Ajoute une nouvelle bouteille
 * @returns {Function} returns.updateBottle - Met à jour une bouteille existante
 * @returns {Function} returns.deleteBottle - Supprime une bouteille
 * 
 * @example
 * const { bottles, loading, error, addBottle, deleteBottle } = useWines();
 * 
 * if (loading) return <div>Chargement...</div>;
 * if (error) return <div>Erreur: {error}</div>;
 * 
 * return (
 *   <div>
 *     {bottles.map(bottle => <WineCard key={bottle.id} bottle={bottle} />)}
 *   </div>
 * );
 */
export const useWines = () => {
  const [bottles, setBottles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Récupère toutes les bouteilles depuis l'API
   * 
   * Fonction interne pour charger/recharger la liste complète des bouteilles.
   * Met à jour automatiquement les états de chargement et d'erreur.
   * 
   * @private
   */
  const fetchBottles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getBottles();
      setBottles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Ajoute une nouvelle bouteille à la cave
   * 
   * @param {Object|FormData} bottleData - Données de la nouvelle bouteille
   * @returns {Promise<Object>} Bouteille créée avec son ID
   * @throws {Error} En cas d'erreur API ou de validation
   */
  const addBottle = async (bottleData) => {
    const newBottle = await apiService.createBottle(bottleData);
    setBottles(prev => [...prev, newBottle]);
    return newBottle;
  };

  /**
   * Met à jour une bouteille existante
   * 
   * @param {number|string} id - Identifiant de la bouteille
   * @param {Object|FormData} bottleData - Nouvelles données de la bouteille
   * @returns {Promise<Object>} Bouteille mise à jour
   * @throws {Error} En cas d'erreur API ou de validation
   */
  const updateBottle = async (id, bottleData) => {
    const updatedBottle = await apiService.updateBottle(id, bottleData);
    setBottles(prev => prev.map(bottle => 
      bottle.id === id ? updatedBottle : bottle
    ));
    return updatedBottle;
  };

  /**
   * Supprime une bouteille de la cave
   * 
   * @param {number|string} id - Identifiant de la bouteille à supprimer
   * @throws {Error} En cas d'erreur API
   */
  const deleteBottle = async (id) => {
    await apiService.deleteBottle(id);
    setBottles(prev => prev.filter(bottle => bottle.id !== id));
  };

  useEffect(() => {
    fetchBottles();
  }, []);

  return {
    bottles,
    loading,
    error,
    refetch: fetchBottles,
    addBottle,
    updateBottle,
    deleteBottle,
  };
};

/**
 * Hook pour gérer une bouteille individuelle
 * 
 * Charge et gère les détails d'une bouteille spécifique.
 * Utile pour les pages de détail ou d'édition d'une bouteille.
 * 
 * @param {number|string} id - Identifiant de la bouteille à charger
 * @returns {Object} Interface de gestion d'une bouteille
 * @returns {Object|null} returns.bottle - Détails de la bouteille ou null
 * @returns {boolean} returns.loading - Indicateur de chargement
 * @returns {string|null} returns.error - Message d'erreur éventuel
 * 
 * @example
 * const { bottle, loading, error } = useWine(bottleId);
 * 
 * if (loading) return <div>Chargement...</div>;
 * if (error) return <div>Erreur: {error}</div>;
 * if (!bottle) return <div>Bouteille introuvable</div>;
 * 
 * return <BottleDetails bottle={bottle} />;
 */
export const useWine = (id) => {
  const [bottle, setBottle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Récupère les détails d'une bouteille spécifique
     * 
     * Fonction interne pour charger une bouteille par son ID.
     * Se déclenche automatiquement quand l'ID change.
     * 
     * @private
     */
    const fetchBottle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getBottle(id);
        setBottle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBottle();
  }, [id]);

  return { bottle, loading, error };
};