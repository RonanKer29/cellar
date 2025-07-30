import { useState } from "react";
import { Menu, X } from "lucide-react";
import ProfileCard from "../components/navbar/ProfileCard";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile navbar header */}
      <div className="sm:hidden flex justify-between items-center px-4 py-3 bg-gray-100 border-b">
        <h1 className="text-lg font-bold">🍇 Ma Cave à vin</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar menu */}
      <aside
        className={`${
          isOpen ? "flex" : "hidden"
        } sm:flex flex-col w-full sm:w-[90px] lg:w-[240px] xl:w-[300px] px-4 py-6 bg-gray-100  shrink-0 z-50 sm:z-auto sm:h-screen absolute sm:static top-[60px] sm:top-auto left-0 transition-all duration-300`}
      >
        <div className="mb-6">
          <h1 className="text-lg font-bold hidden sm:block">
            🍇 Ma Cave à vin
          </h1>
          <p className="text-sm text-gray-400 hidden sm:block">Dashboard</p>
        </div>

        <div className="border-b mb-4"></div>

        <ProfileCard />

        <nav className="flex flex-col space-y-3 mt-6 text-2xl text-gray-600 items-start">
          <button className="hover:text-purple-600 transition">
            Dashboard
          </button>
          <button className="hover:text-purple-600 transition">
            My Cellar
          </button>
          <button className="hover:text-purple-600 transition">Add Wine</button>
          <button className="hover:text-purple-600 transition">
            Tasting Notes
          </button>
          <button className="hover:text-purple-600 transition">
            Analytics
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
