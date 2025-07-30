import StatCard from "./dashboard/StatCard";
import { Wine, Package, MapPin, CheckCircle } from "lucide-react";
import WineList from "./dashboard/WineList";

const Dashboard = ({ bottles }) => {
  const total = bottles.reduce((acc, b) => acc + (b.quantity || 0), 0);

  const inCellar = bottles
    .filter((b) => b.status === "En cave")
    .reduce((acc, b) => acc + (b.quantity || 0), 0);

  const drunkThisYear = bottles
    .filter((b) => {
      const year = new Date(b.date_added).getFullYear();
      return b.status === "Bue" && year === new Date().getFullYear();
    })
    .reduce((acc, b) => acc + (b.quantity || 0), 0);

  const regions = [...new Set(bottles.map((b) => b.region))].filter(Boolean);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total bouteilles"
          value={total}
          subtitle="Dans toute la cave"
          icon={Wine}
          color="purple"
        />
        <StatCard
          title="En cave"
          value={inCellar}
          subtitle="Stock actuel"
          icon={Package}
          color="green"
        />
        <StatCard
          title="Bues cette année"
          value={drunkThisYear}
          subtitle={`${new Date().getFullYear()}`}
          icon={CheckCircle}
          color="orange"
        />
        <StatCard
          title="Régions"
          value={regions.length}
          subtitle="Différentes appellations"
          icon={MapPin}
          color="blue"
        />
      </div>
      <WineList bottles={bottles} />
    </>
  );
};

export default Dashboard;
