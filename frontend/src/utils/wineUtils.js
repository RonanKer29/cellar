export const getWineColorClass = (color) => {
  switch (color) {
    case "Rouge":
      return "bg-[#FEE2E2]";
    case "Blanc":
      return "bg-[#FEF9C3]";
    case "Rosé":
      return "bg-pink-200";
    case "Pétillant":
      return "bg-[#DCFCE7]";
    default:
      return "bg-gray-300";
  }
};

export const getWineIconColor = (color) => {
  switch (color) {
    case "Rouge":
      return "text-[#DC2626]";
    case "Blanc":
      return "text-[#CA8A04]";
    case "Pétillant":
      return "text-[#16A34A]";
    case "Rosé":
      return "text-pink-600";
    default:
      return "text-gray-400";
  }
};

export const getStatCardColorMapping = () => ({
  purple: {
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  green: {
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  pink: {
    iconColor: "text-[#DB2777]",
    bgColor: "bg-[#FCE7F3]",
  },
  blue: {
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
});

export const calculateWineStats = (bottles) => {
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

  return {
    total,
    inCellar,
    drunkThisYear,
    regionsCount: regions.length,
    bottlesThisMonth,
  };
};