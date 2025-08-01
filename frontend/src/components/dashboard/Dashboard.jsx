import StatCard from "./StatCard";
import { Wine, Warehouse, Globe, CheckCircle } from "lucide-react";
import WineList from "./WineList";
import Intro from "./Intro";

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
          value={regions.length}
          subtitle="Différentes appellations"
          icon={Globe}
          color="purple"
        />
      </div>
      <WineList bottles={bottles} />
    </>
  );
};

export default Dashboard;
