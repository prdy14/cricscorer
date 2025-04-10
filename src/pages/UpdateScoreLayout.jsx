import React from "react";
import { UpdateMatchProvider } from "../context/UpdateMatchContext";
import { Outlet } from "react-router-dom";

import { SideBar } from "../components/ui/SideBar";

function UpdateScoreLayout() {
  return (
    <UpdateMatchProvider>
      <div className=" z-50 sticky top-0 flex items-center  bg-[#426f51] px-2 sm:px-6">
        <div></div>
        <h1 className="text-center text-xl sm:text-2xl bg-[#426f51] font-semibold py-4 text-white mr-auto ml-auto ">
          Start match
        </h1>
        <div>
          <SideBar></SideBar>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </UpdateMatchProvider>
  );
}

export default UpdateScoreLayout;
