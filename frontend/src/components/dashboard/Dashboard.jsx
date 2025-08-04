import StatCard from "./StatCard";
import { Wine, Warehouse, Globe, CheckCircle } from "lucide-react";
import WineList from "./WineList";
import Intro from "./Intro";
import { calculateWineStats } from "../../utils/wineUtils";

const Dashboard = ({ bottles }) => {
  const {
    total,
    inCellar,
    drunkThisYear,
    regionsCount,
    bottlesThisMonth,
  } = calculateWineStats(bottles);

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
      <WineList bottles={bottles} />
    </>
  );
};

export default Dashboard;
