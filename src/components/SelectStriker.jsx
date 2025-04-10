import React, { useEffect, useState } from "react";
import { updateMatch } from "../context/UpdateMatchContext";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";

function SelectStriker() {
  const { battingTeam, batters, handelSetStriker, striker, navigate, path } =
    updateMatch();

  const [str, setStr] = useState(striker);

  useEffect(() => {
    const rout = path.current.split("/");
    console.log(striker);
    rout.pop();
    const p = rout.join("/");
    if (striker) {
      navigate(p + "/updateScore");
    }
  }, [striker]);
  const arr = [1, 2];

  return (
    <div>
      <h3 className="text-sm md:text-lg lg:text-xl font-semibold">
        Select Striker for {battingTeam?.name}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-2">
        {battingTeam?.players
          ?.filter(
            (player) =>
              batters.some((batter) => {
                return batter.playerId === player.id;
              }) == false
          )
          .map((player) => (
            <Card
              key={player.id + "kh"}
              className={`p-2 text-center shadow-md cursor-pointer ${
                str?.playerId === player.id ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() =>
                setStr((prev) => {
                  console.log(prev);
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
          if (striker) {
            navigate(p + "/updateScore");
          }
          handelSetStriker(str);
        }}
      >
        ok
      </Button>
    </div>
  );
}

export default SelectStriker;
