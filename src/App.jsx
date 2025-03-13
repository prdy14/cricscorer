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
import { MatchProvider } from "./context/MatchContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MatchProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<LandingPage />} />
              <Route path="/startmatch" element={<StartMatchOutlet />}>
                <Route path="" element={<StartMatch />} />
                <Route path="selectteam" element={<SelectTeam />}>
                  <Route path="myteams" element={<MyTeams />} />
                  <Route path="addteam" element={<AddTeam />} />
                </Route>
              </Route>
            </Route>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </MatchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
