import Avatar from "../ui/avatar";
import { Wine, Crown, Award } from "lucide-react";
import { useUser } from "../../hooks/useUser";

const ProfileCard = () => {
  const { user, displayName, level } = useUser();

  if (!user) return null;

  // Déterminer l'icône basé sur le niveau
  const getLevelIcon = (levelName) => {
    if (levelName === "Maître Sommelier") return Crown;
    if (levelName === "Expert") return Award;
    return Wine;
  };

  const LevelIcon = getLevelIcon(level.level);

  return (
    <div className="flex w-full gap-4 mt-5 bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl items-center border border-pink-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <Avatar 
          name={displayName}
          size={56}
          className="ring-2 ring-pink-200/50 hover:ring-pink-300/50 transition-all duration-200"
        />
        {/* Badge de niveau */}
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center`}>
          <LevelIcon className={`w-3 h-3 ${level.color}`} />
        </div>
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <p className="font-bold text-gray-900 text-lg truncate">
          {displayName}
        </p>
        <div className="flex items-center gap-1.5">
          <LevelIcon className={`w-4 h-4 ${level.color}`} />
          <p className={`text-sm font-medium ${level.color}`}>
            {level.level}
          </p>
          <span className="text-xs text-gray-500 ml-1">
            ({user.bottles_count || 0} bouteilles)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
