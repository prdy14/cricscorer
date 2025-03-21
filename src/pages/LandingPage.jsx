import React from "react";
import { Ticket as Cricket, Trophy, Users2, BarChart3 } from "lucide-react";
import NavBar from "../components/NavBar";
import { Link, Outlet } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white  ">
      <NavBar />

      <Outlet />
    </div>
  );
}

export default LandingPage;
