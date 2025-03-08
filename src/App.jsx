import { useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import AppSidebar from "./components/SideBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

function App() {
  const [login, setLogin] = useState(false);
  const handelClick = () => {
    setLogin(!login);
  };
  return (
    <>
      <BrowserRouter>
        {login ? (
          <>
            <NavBar />
            <LandingPage />
          </>
        ) : (
          <Login handelClick={handelClick} />
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
