import { useEffect, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";

const Home = () => {
  const [bottles, setBottles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data depuis Django API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/bottles/");
        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }
        const data = await res.json();
        setBottles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if loading
  if (loading) {
    return <p className="text-center py-10 text-gray-600">Chargement...</p>;
  }

  // if error
  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p>❌ Une erreur est survenue :</p>
        <pre>{error}</pre>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Dashboard bottles={bottles} />
    </div>
  );
};

export default Home;
