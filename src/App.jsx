import { useState } from "react";

import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import StartMatch from "./pages/StartMatch";
import SelectTeam from "./pages/SelectTeam";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import StartMatchOutlet from "./pages/StartMatchOutlet.jsx";
import AddTeam from "./pages/AddTeam.jsx";
import MyTeams from "./pages/MyTeams.jsx";

import Home from "./pages/Home.jsx";
import UpdateScore from "./pages/UpdateScore.jsx";
import UpdateScoreLayout from "./pages/UpdateScoreLayout.jsx";
import SelectPlayers from "./components/SelectPlayers.jsx";
import SelectStriker from "./components/SelectStriker.jsx";
import SelectNonStriker from "./components/SelectNonStriker.jsx";
import SelectBowler from "./components/SelectBowler.jsx";
import LiveMatches from "./pages/LiveMatches.jsx";
import LiveMatch from "./pages/LiveMatch.jsx";
import LiveMatchLayout from "./pages/LiveMatchLayout.jsx";
import Scorecard from "./pages/Scorecard.jsx";
import Squards from "./pages/Squards.jsx";
import Overs from "./pages/Overs.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<LandingPage />}>
            <Route index element={<Home />} />
            <Route path="/liveMatches" element={<LiveMatches />} />
            <Route path="/liveMatch/:matchId" element={<LiveMatchLayout />}>
              <Route path="live" element={<LiveMatch />} />
              <Route path="scorecard" element={<Scorecard />} />
              <Route path="squard" element={<Squards />} />
              <Route path="overs" element={<Overs />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/startmatch" element={<StartMatchOutlet />}>
              <Route path="" element={<StartMatch />} />
              <Route path="selectteam" element={<SelectTeam />}>
                <Route path="myteams" element={<MyTeams />} />
                <Route path="addteam" element={<AddTeam />} />
              </Route>
            </Route>
            <Route path="/updatematch/:matchId" element={<UpdateScoreLayout />}>
              <Route path="selectstriker" element={<SelectStriker />} />
              <Route path="selectnonstriker" element={<SelectNonStriker />} />
              <Route path="selectbowler" element={<SelectBowler />} />

              <Route path="updatescore" element={<UpdateScore />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
