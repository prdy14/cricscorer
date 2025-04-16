import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../config/axios";
import { Outlet, useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password });

      const { token, username } = response.data;

      localStorage.setItem("token", token);
      setUser(username);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(response);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    delete axios.defaults.headers.common["Authorization"];
  };

  const signup = async (username, email, password) => {
    try {
      const res = await axios.post("/auth/signup", {
        username,
        email,
        password,
      });
      console.log(res.data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
