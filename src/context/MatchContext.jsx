import React, { createContext, useContext, useState } from "react";

const MatchContext = createContext(undefined);

export function MatchProvider({ children }) {
  const [formdata, setFormData] = useState({
    teamA: null,
    teamB: null,
  });

  const handelInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <MatchContext.Provider
      value={{
        formdata,
        handelInputChange,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export const createMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
