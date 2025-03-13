import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import AlertDialogDemo from "../components/Alert";

function SelectTeam() {
  const tabs = [
    {
      link: "myteams",
      name: "MY TEAMS",
    },

    {
      link: "addTeam",
      name: "ADD",
    },
  ];
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="">
      <nav className="flex bg-[#426f51] sticky top-14 z-20">
        {tabs.map((tab, index) => (
          <Link
            to={tab.link}
            key={index}
            className={`p-2  border-b-4  border-[#426f51] ${
              !path.endsWith(tab.link)
                ? "text-gray-300 hover:bg-[#083f27] hover:text-white"
                : "text-white border-yellow-600 border-b-4"
            } font-semibold text-[14px] sm:text-sm ml-2`}
          >
            {tab.name}
          </Link>
        ))}
      </nav>

      <Outlet />
    </div>
  );
}

export default SelectTeam;
