import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

function SelectStriker({
  teamA = ["praveen1", "prave1en", "p1raveen"],
  teamB = ["1praveen", "1raveen", "pr1aveen"],
}) {
  const [striker, setStriker] = useState(null);
  const [nonStriker, setNonStriker] = useState(null);
  const [bowler, setBowler] = useState(null);
  return (
    <>
      <h2 className="text-xl font-bold">Select Players</h2>

      <h3 className="text-lg font-semibold">Select Striker (Team A)</h3>
      <div className="grid grid-cols-2 gap-2">
        {teamA.map((player) => (
          <Card
            key={player}
            className={`p-2 text-center shadow-md cursor-pointer ${
              striker === player ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setStriker(player)}
          >
            {player}
          </Card>
        ))}
      </div>

      <h3 className="text-lg font-semibold">Select Non-Striker (Team A)</h3>
      <div className="grid grid-cols-2 gap-2">
        {teamA
          .filter((player) => player !== striker)
          .map((player) => (
            <Card
              key={player}
              className={`p-2 text-center shadow-md cursor-pointer ${
                nonStriker === player ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setNonStriker(player)}
            >
              {player}
            </Card>
          ))}
      </div>
      <h3 className="text-lg font-semibold">Select Bowler (Team B)</h3>
      <div className="grid grid-cols-2 gap-2">
        {teamB.map((player) => (
          <Card
            key={player}
            className={`p-2 text-center shadow-md cursor-pointer ${
              bowler === player ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => setBowler(player)}
          >
            {player}
          </Card>
        ))}
      </div>
    </>
  );
}

export default SelectStriker;
