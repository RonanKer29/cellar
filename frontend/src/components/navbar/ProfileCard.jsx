import photoProfile from "../../assets/navbar/ronan.jpg";

const ProfileCard = () => {
  return (
    <div className="flex w-full gap-4 mt-5 bg-[#FDF2F8] p-4 rounded-2xl items-center">
      <img
        src={photoProfile}
        alt="profile picture"
        className="w-14 h-14 rounded-full object-cover"
      />
      <div className="flex flex-col justify-center">
        <p className="font-bold text-black text-xl">Ronan</p>
        <p className="text-lg font-semibold text-[#6B7280]">Niveau 1</p>
      </div>
    </div>
  );
};

export default ProfileCard;
