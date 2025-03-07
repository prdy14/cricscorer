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

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <SidebarTrigger className="-ml-1" />
          </SidebarInset>
        </SidebarProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
