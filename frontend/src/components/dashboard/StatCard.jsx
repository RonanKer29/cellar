import { getStatCardColorMapping } from "../../utils/wineUtils";

const StatCard = ({ title, value, subtitle, icon: Icon, color = "purple" }) => {
  const colorMapping = getStatCardColorMapping();
  const { iconColor, bgColor } = colorMapping[color] || colorMapping["purple"];

  return (
    <div className="bg-white rounded-xl px-6 py-5 shadow flex items-center justify-between">
      <div className="flex flex-col">
        <h3 className="text-lg font-extrabold text-black">{title}</h3>
        <div className="text-xl font-bold text-gray-700">{value}</div>
        {subtitle && (
          <p className={`text-sm font-medium ${iconColor}`}>{subtitle}</p>
        )}
      </div>
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-xl ${bgColor}`}
      >
        <Icon className={`w-10 h-10 ${iconColor}`} />
      </div>
    </div>
  );
};

export default StatCard;
