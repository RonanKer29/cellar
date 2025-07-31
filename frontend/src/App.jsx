import { Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";
import AddWine from "./pages/AddWine";
import AddWineFull from "./pages/AddWineFull";
import BottleDetail from "./components/bottleView/BottleDetail";

const App = () => {
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto bg-[#F9FAFB]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ajouter-vin" element={<AddWine />} />
          <Route path="/ajouter-vin/complet" element={<AddWineFull />} />
          <Route path="/bouteille/:id" element={<BottleDetail />} />
          {/* Ajoute d'autres routes si besoin */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
