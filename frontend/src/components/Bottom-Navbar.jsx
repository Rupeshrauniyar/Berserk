import React from "react";
import {motion} from "framer-motion";
import {Link, NavLink, useLocation} from "react-router-dom";
import { 
  IoHomeOutline, IoHome,
  IoSearchOutline, IoSearch,
  IoTimeOutline, IoTime,
  IoLibraryOutline, IoLibrary,
  IoDownloadOutline, IoDownload
} from "react-icons/io5";

const BottomNavbar = () => {
  const activePath = useLocation();
  const NavigateOptions = [
    {
      icon: IoHomeOutline,
      activeIcon: IoHome,
      label: "Home",
      path: "/",
    },
    {
      icon: IoSearchOutline,
      activeIcon: IoSearch,
      label: "Search",
      path: "/search",
    },
    {
      icon: IoTimeOutline,
      activeIcon: IoTime,
      label: "History",
      path: "/history",
    },
    {
      icon: IoLibraryOutline,
      activeIcon: IoLibrary,
      label: "Playlist",
      path: "/playlist",
    },
    {
      icon: IoDownloadOutline,
      activeIcon: IoDownload,
      label: "Downloads",
      path: "/downloads",
    },
  ];

  return (
    <>
      <div className="xl:hidden flex items-center justify-around fixed bottom-0 left-0 right-0 z-50 h-[calc(72px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-zinc-950/80 backdrop-blur-xl border-t border-white/5 text-white px-2">
        {NavigateOptions.map((Option, i) => {
          const isActive = activePath.pathname === Option.path;
          const IconComponent = isActive ? Option.activeIcon : Option.icon;
          return (
            <NavLink
              to={Option.path}
              key={i}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
                isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}>
              <IconComponent className="w-[26px] h-[26px]" />
              <span className="text-[10px] font-medium">{Option.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="sm:hidden px-4 xl:flex h-full flex-col items-start justify-start cursor-pointer fixed top-0 bg-zinc-950/95 w-[20%] border-r border-white/5 pt-[calc(1rem+env(safe-area-inset-top))] pb-[env(safe-area-inset-bottom)]">
        {NavigateOptions.map((navLink, index) => {
          const isActive = activePath.pathname === navLink.path;
          const IconComponent = isActive ? navLink.activeIcon : navLink.icon;
          return (
            <NavLink
              key={index}
              to={navLink.path}
              className={`
                  flex items-center px-4 py-3 my-1 rounded-md w-full transition-all duration-200 first-of-type:mt-18
                  ${
                    isActive
                      ? "bg-zinc-800/80 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }
                `}>
              <IconComponent className="w-6 h-6 mr-4" />
              <span className="font-semibold text-sm">{navLink.label}</span>
            </NavLink>
          );
        })}

        {/* Divider */}
        <div className="border-t border-white/5 my-4 w-full"></div>

        {/* Settings Link */}
        <NavLink
          to="/settings"
          className={({isActive}) => `
              flex items-center px-4 py-3 my-1 rounded-md w-full transition-all duration-200
              ${
                isActive
                  ? "bg-zinc-800/80 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }
            `}>
        </NavLink>
      </div>
    </>
  );
};

export default BottomNavbar;
