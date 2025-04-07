import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { updateMatch } from "../context/UpdateMatchContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function SelectPlayers() {
  const {
    battingTeam,
    bowlingTeam,
    striker,
    nonStriker,
    bowler,
    batters,
    handelSetStriker,
  } = updateMatch();

  const navigate = useNavigate();
  const [bow, setBow] = useState(bowler);
  const [str, setStr] = useState(striker);
  const [nonStr, setNonStr] = useState(nonStriker);
  useEffect(() => {
    console.log(striker, nonStriker, bowler);
    if (striker?.id && nonStriker?.id && bowler?.id) {
      console.log("hi");
      navigate("updatescore");
    }
  }, []);
  return (
    <>
      <h2 className="text-xl font-bold">Select Players</h2>
      <h3 className="text-sm md:text-lg lg:text-xl font-semibold">
        Select Striker for {battingTeam?.name}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-2">
        {battingTeam?.players
          .filter((player) => batters.indexOf(player.id) < 0)
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

      <h3 className="text-lg font-semibold">
        Select Non-Striker {battingTeam?.name}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {battingTeam?.players
          .filter(
            (player) =>
              batters.indexOf(player.id) < 0 && str?.playerId != player.id
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
          navigate(-1);
          handelSetStriker(str, nonStr, bow);
        }}
      >
        ok
      </Button>
    </>
  );
}

export default SelectPlayers;
