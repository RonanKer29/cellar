import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";
import AddWine from "./pages/AddWine";
import AddWineFull from "./pages/AddWineFull";
import EditWine from "./pages/EditWine";
import MaCave from "./pages/MaCave";
import Stats from "./pages/Stats";
import BottleDetail from "./components/bottle/BottleDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <div className="text-center">
          <div className="inline-flex bg-gradient-to-br from-pink-600 to-purple-600 p-4 rounded-2xl shadow-lg mb-4 animate-pulse">
            <div className="w-10 h-10 bg-white/20 rounded"></div>
          </div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      {isAuthenticated && <Navbar />}
      <main className="flex-1 overflow-auto bg-[#F9FAFB]">
        <Routes>
          {/* Pages publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Toutes les autres routes protégées */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ma-cave"
            element={
              <ProtectedRoute>
                <MaCave />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ajouter-vin"
            element={
              <ProtectedRoute>
                <AddWine />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ajouter-vin/complet"
            element={
              <ProtectedRoute>
                <AddWineFull />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bouteille/:id"
            element={
              <ProtectedRoute>
                <BottleDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bouteille/:id/edit"
            element={
              <ProtectedRoute>
                <EditWine />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
