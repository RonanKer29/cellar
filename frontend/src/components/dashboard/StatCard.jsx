// src/components/dashboard/StatCard.jsx
import { Wine } from "lucide-react";

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow  flex flex-col items-start justify-between min-w-[150px]">
      <div className="flex items-center mb-2">
        {Icon && <Icon className={`h-5 w-5 mr-2 text-${color}-500`} />}
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
};

export default StatCard;
