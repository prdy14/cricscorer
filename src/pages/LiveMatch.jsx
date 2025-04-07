import React, { useEffect, useRef, useState } from "react";
import BatterTitle from "../components/ui/BatterTitle";
import BatterPerformance from "../components/BatterPerformance";
import Ball from "../components/Ball";
import { useLocation, useParams } from "react-router-dom";
import BowlerTitle from "../components/ui/BowlerTitle";
import BowlerPerformence from "../components/BowlerPerformence";
import Title from "../components/Title";
import instance from "../config/axios";
import { liveMatch } from "../context/LiveMatch";

function LiveMatch() {
  const {
    teamA,
    teamB,
    score,
    wickets,
    over,
    ballNo,
    striker,
    nonStriker,
    bowler,
    balls,
  } = liveMatch();
  return (
    <div className="md:ml-[20%] md:mr-[20%]">
      <div className="flex  items-center p-2  justify-between  bg-[#426f51] text-slate-200 ">
        <div className="flex flex-col items-center px-3">
          <p className="font-bold sm:text-2xl">{teamA?.name}</p>
          <p className="font-bold text-lg">{`${score}-${wickets}`}</p>
        </div>
        <div className="flex flex-col items-center px-3">
          <p className="text-sm">overs</p>
          <p className="font-bold text-lg">{`${over}.${ballNo}`}</p>
        </div>
      </div>
      <div>
        <BatterTitle />
        <BatterPerformance
          runs={striker?.runs}
          balls={striker?.balls}
          fours={striker?.fours}
          sixs={striker?.sixes}
          sr={
            striker?.balls == 0
              ? 0
              : ((striker?.runs * 100) / striker?.balls).toFixed(1)
          }
          name={striker?.name + "*"}
        />
        <BatterPerformance
          runs={nonStriker?.runs}
          balls={nonStriker?.balls}
          fours={nonStriker?.fours}
          sixs={nonStriker?.sixes}
          sr={
            nonStriker?.balls == 0
              ? 0
              : ((nonStriker?.runs * 100) / nonStriker?.balls).toFixed(1)
          }
          name={nonStriker?.name}
        />
        <BowlerTitle />
        <BowlerPerformence
          name={bowler?.name}
          overs={bowler?.overs?.toFixed(1)}
          runs={bowler?.runs}
          wickets={bowler?.wickets}
          madien={bowler?.madiens}
          eco={
            bowler?.overs != 0
              ? (
                  (bowler?.runs * 6) /
                  (6 * Math.floor(bowler?.overs + 0.0001) + ballNo)
                ).toFixed(1)
              : 0
          }
        />
        <Title name={"Current Over"} />
        <div className="w-full h-18 flex scrollbar-hide ">
          {balls.map((ball, index) => {
            return (
              <Ball key={`ball-${index}`} value={ball.type} runs={ball.runs} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LiveMatch;
