import React from "react";
import { UpdateMatchProvider } from "../context/UpdateMatchContext";
import { Outlet } from "react-router-dom";

function UpdateScoreLayout() {
  return (
    <UpdateMatchProvider>
      <div>
        <Outlet />
      </div>
    </UpdateMatchProvider>
  );
}

export default UpdateScoreLayout;
