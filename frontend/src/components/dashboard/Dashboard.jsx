import { useState } from "react";
import StatCard from "./StatCard";
import { Wine, Warehouse, Globe, CheckCircle } from "lucide-react";
import WineList from "./WineList";
import Intro from "./Intro";
import { calculateWineStats } from "../../utils/wineUtils";
import FilterCategories from "./FilterCategories";
import SearchCategories from "./SearchCategories";

const Dashboard = ({ bottles }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("Tous");
  const [selectedRegion, setSelectedRegion] = useState("Tous");
  const [selectedProductor, setSelectedProductor] = useState("Tous");

  const { total, inCellar, drunkThisYear, regionsCount, bottlesThisMonth } =
    calculateWineStats(bottles);

  // Déduire toutes les couleurs, régions, producteurs présents
  const colors = ["Tous", ...Array.from(new Set(bottles.map((b) => b.color)))];
  const regions = [
    "Tous",
    ...Array.from(new Set(bottles.map((b) => b.region).filter(Boolean))),
  ];
  const productors = [
    "Tous",
    ...Array.from(new Set(bottles.map((b) => b.productor).filter(Boolean))),
  ];

  // Filtrage des bouteilles selon la recherche
  const filteredBottles = bottles.filter((bottle) => {
    const matchesSearch = [bottle.name, bottle.productor, bottle.region]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesColor =
      selectedColor === "Tous" || bottle.color === selectedColor;
    const matchesRegion =
      selectedRegion === "Tous" || bottle.region === selectedRegion;
    const matchesProductor =
      selectedProductor === "Tous" || bottle.productor === selectedProductor;

    return matchesSearch && matchesColor && matchesRegion && matchesProductor;
  });

  return (
    <>
      <Intro />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total bouteilles"
          value={total}
          subtitle={`+${bottlesThisMonth} bouteilles ce mois-ci`}
          icon={Wine}
          color="blue"
          rotate={true}
        />
        <StatCard
          title="En cave"
          value={inCellar}
          subtitle="Stock actuel"
          icon={Warehouse}
          color="green"
        />
        <StatCard
          title="Bues cette année"
          value={drunkThisYear}
          subtitle={`${new Date().getFullYear()}`}
          icon={CheckCircle}
          color="pink"
        />
        <StatCard
          title="Régions"
          value={regionsCount}
          subtitle="Différentes appellations"
          icon={Globe}
          color="purple"
        />
      </div>
      <SearchCategories searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterCategories
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        regions={regions}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        productors={productors}
        selectedProductor={selectedProductor}
        setSelectedProductor={setSelectedProductor}
      />
      <WineList bottles={filteredBottles} />
    </>
  );
};

export default Dashboard;
