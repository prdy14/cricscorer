import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import AlertDialogDemo from "../components/Alert";
import { useLocation } from "react-router-dom";
import { createMatch } from "../context/MatchContext";

function StartMatchOutlet() {
  const location = useLocation();
  const navigate = useNavigate();

  const { matchStarted } = createMatch();

  const onCancel = () => {};
  const onContinue = () => {
    if (!location.pathname.endsWith("/startmatch")) {
      navigate("/startmatch");
    }
  };

  return (
    <div>
      {matchStarted ? (
        <>matchStarted</>
      ) : (
        <div className="flex justify-center flex-col">
          <div className=" z-50 sticky top-0 flex items-center  bg-[#426f51] px-2 sm:px-6">
            <AlertDialogDemo title="BACK" onContinue={onContinue} />
            <h1 className="text-center text-xl sm:text-2xl bg-[#426f51] font-semibold py-4 text-white mr-auto ml-auto ">
              Start match
            </h1>
            <Button
              disabled={false}
              className=" bg-white text-black hover:bg-gray-100 hover:text-black"
            >
              DONE
            </Button>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default StartMatchOutlet;
