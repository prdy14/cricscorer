import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { updateMatch } from "../context/UpdateMatchContext";
import { Button } from "./ui/button";

function SelectBowler() {
  const { bowlingTeam, handelSetBowler, navigate, bowler, path } =
    updateMatch();

  const [bow, setBow] = useState(bowler);

  useEffect(() => {
    const rout = path.current.split("/");
    rout.pop();
    const p = rout.join("/");
    if (bowler) {
      navigate(p + "/updateScore");
    }
  }, [bowler]);

  return (
    <div>
      <h3 className="text-lg font-semibold">
        Select Bowler {bowlingTeam?.name}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {bowlingTeam?.players.map((player, index) => (
          <Card
            key={index + "df"}
            className={`p-2 text-center shadow-md cursor-pointer ${
              bow?.playerId === player.id ? "bg-red-500 text-white" : ""
            }`}
            onClick={() =>
              setBow((prev) => {
                console.log("hi");
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
          if (bowler) {
            navigate(p + "/updateScore");
          }
          handelSetBowler(bow);
        }}
      >
        ok
      </Button>
    </div>
  );
}

export default SelectBowler;
