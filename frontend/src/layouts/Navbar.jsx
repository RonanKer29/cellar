import { useState } from "react";
import { Menu, Wine } from "lucide-react";
import ProfileCard from "../components/navbar/ProfileCard"; // Ou intégré
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavItems from "@/components/navbar/NavItems";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="sm:hidden flex justify-between items-center px-4 py-3 bg-white border-b shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="inline-flex bg-pink-600 p-2 rounded-lg">
            <Wine className="text-white w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-gray-800">Ma Cave à vin</h1>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <div className="flex flex-col h-full">
              <SheetHeader className="p-6 border-b bg-gradient-to-r from-pink-50 to-purple-50">
                <div className="flex items-center space-x-3">
                  <div className="inline-flex bg-pink-600 p-3 rounded-xl">
                    <Wine className="text-white w-8 h-8" />
                  </div>
                  <div>
                    <SheetTitle className="text-xl font-bold text-gray-800">
                      Ma Cave à vin
                    </SheetTitle>
                    <p className="text-sm text-gray-500 mt-1">Dashboard</p>
                  </div>
                </div>
              </SheetHeader>
              <div className="flex-1 p-6">
                <ProfileCard />
                <NavItems isMobile={true} onClick={() => setIsOpen(false)} />
              </div>
              <div className="p-6 border-t bg-gray-50">
                <p className="text-xs text-gray-500 text-center">
                  Version 1.0 • Made with ❤️
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex flex-col w-[90px] lg:w-[240px] xl:w-[300px] px-4 py-6 bg-white border-r shadow-sm shrink-0 h-screen">
        <div className="mb-6 flex items-center justify-center lg:justify-start space-x-3">
          <div className="inline-flex bg-pink-600 p-3 rounded-xl shadow-lg">
            <Wine className="text-white w-8 h-8 lg:w-10 lg:h-10" />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-gray-800">Ma Cave à vin</h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </div>
        <div className="border-b mb-4 opacity-20"></div>
        <div className="mb-4">
          <ProfileCard />
        </div>
        <NavItems />
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-4 text-white">
              <h3 className="font-semibold text-sm mb-2">Upgrade to Pro</h3>
              <p className="text-xs opacity-90 mb-3">
                Unlock advanced features and analytics
              </p>
              <Button size="sm" variant="secondary" className="w-full text-xs">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
