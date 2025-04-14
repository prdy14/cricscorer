import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { LiveMatchProvider } from "../context/LiveMatch";

function LiveMatchLayout() {
  const tabs = [
    {
      link: "live",
      name: "Live",
    },

    {
      link: "scorecard",
      name: "scoreCard",
    },
    {
      link: "squard",
      name: "squard",
    },
    {
      link: "overs",
      name: "Overs",
    },
  ];
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="">
      <div>
        <nav className="flex bg-[#426f51] sticky top-0 z-20">
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
          <Link to={"/"}>back</Link>
        </nav>
      </div>
      <LiveMatchProvider>
        <Outlet />
      </LiveMatchProvider>
    </div>
  );
}

export default LiveMatchLayout;
