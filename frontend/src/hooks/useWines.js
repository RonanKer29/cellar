import { useState, useEffect } from "react";
import { apiService } from "../services/api";

export const useWines = () => {
  const [bottles, setBottles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const addBottle = async (bottleData) => {
    const newBottle = await apiService.createBottle(bottleData);
    setBottles(prev => [...prev, newBottle]);
    return newBottle;
  };

  const updateBottle = async (id, bottleData) => {
    const updatedBottle = await apiService.updateBottle(id, bottleData);
    setBottles(prev => prev.map(bottle => 
      bottle.id === id ? updatedBottle : bottle
    ));
    return updatedBottle;
  };

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

export const useWine = (id) => {
  const [bottle, setBottle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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