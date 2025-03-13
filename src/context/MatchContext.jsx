import React, { createContext, useContext, useState } from "react";

const MatchContext = createContext(undefined);

export function MatchProvider({ children }) {
  const [formdata, setFormData] = useState({
    teamA: null,
    teamB: null,
  });
  const [match, setMatch] = useState(null);

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    console.log(formdata);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [matchStarted, setMatchStarted] = useState(false);
  const startMatch = (match) => {
    setMatch(match);
    setMatchStarted(true);
  };
  const endMatch = () => {
    setMatchStarted(false);
  };
  return (
    <MatchContext.Provider
      value={{
        startMatch,
        endMatch,
        formdata,
        handelInputChange,
        match,
        matchStarted,
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
