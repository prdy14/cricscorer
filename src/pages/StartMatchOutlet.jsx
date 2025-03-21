import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import AlertDialogDemo from "../components/Alert";

import { createMatch, MatchProvider } from "../context/MatchContext";

function StartMatchOutlet() {
  const navigate = useNavigate();

  const onContinue = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-center flex-col">
        <div className=" z-50 sticky top-0 flex items-center  bg-[#426f51] px-2 sm:px-6">
          <AlertDialogDemo title="BACK" onContinue={onContinue} />
          <h1 className="text-center text-xl sm:text-2xl bg-[#426f51] font-semibold py-4 text-white mr-auto ml-auto ">
            Start match
          </h1>
          <div className="hide">done</div>
        </div>
        <MatchProvider>
          <Outlet />
        </MatchProvider>
      </div>
    </div>
  );
}

export default StartMatchOutlet;
