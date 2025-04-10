import React, { useEffect, useState } from "react";
import { updateMatch } from "../context/UpdateMatchContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

function SelectNonStriker() {
  const {
    battingTeam,
    striker,
    batters,
    handelSetNonStriker,
    navigate,
    nonStriker,
    path,
  } = updateMatch();
  useEffect(() => {
    const rout = path.current.split("/");
    rout.pop();
    const p = rout.join("/");
    if (nonStriker) {
      navigate(p + "/updateScore");
    }
  }, [nonStriker]);
  const [nonStr, setNonStr] = useState(nonStriker);
  return (
    <div>
      <h3 className="text-lg font-semibold">
        Select Non-Striker {battingTeam?.name}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {battingTeam?.players
          ?.filter(
            (player) =>
              batters.some((batter) => {
                return batter.playerId === player.id;
              }) == false
          )
          .map((player) => (
            <Card
              key={player.id + " jd"}
              className={`p-2 text-center shadow-md cursor-pointer ${
                nonStr?.playerId === player.id ? "bg-blue-500  text-white" : ""
              }`}
              onClick={() =>
                setNonStr((prev) => {
                  return { ...player, playerId: player.id };
                })
              }
            >
              {player.name}
            </Card>
          ))}
      </div>
      <Button
        onClick={() => {
          const rout = path.current.split("/");
          rout.pop();
          const p = rout.join("/");
          if (nonStriker) {
            navigate(p + "/updateScore");
          }
          handelSetNonStriker(nonStr);
        }}
      >
        ok
      </Button>
    </div>
  );
}

export default SelectNonStriker;
