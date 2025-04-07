import React from "react";
import { liveMatch } from "../context/LiveMatch";

function Squards() {
  const { teamA, teamB } = liveMatch();
  return (
    <div className="grid grid-cols-2 ml-auto mr-auto w-fill sm:w-[70%] max-w-[800px]">
      <div>
        <div>{teamA.name}</div>
        {teamA?.players.map((player) => {
          return <div>{player.name}</div>;
        })}
      </div>
      <div>
        <div>{teamB.name}</div>
        {teamB?.players.map((player) => {
          return <div>{player.name}</div>;
        })}
      </div>
    </div>
  );
}

export default Squards;
