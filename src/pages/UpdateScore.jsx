import React, { useEffect, useState } from "react";

import BatterPerformance from "../components/BatterPerformance";
import Title from "../components/Title";
import BowlerPerformence from "../components/BowlerPerformence";
import Ball from "../components/Ball";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "../config/axios";
import BatterTitle from "../components/ui/BatterTitle";
import BowlerTitle from "../components/ui/BowlerTitle";
import InputUpdate from "../components/ui/InputUpdate";
import { Button } from "../components/ui/button";
import InputDialog from "../components/ui/InputDialog";
import InputOut from "../components/ui/InputOut";
import { updateMatch } from "../context/UpdateMatchContext";
import instance from "../config/axios";
import { useNavigate } from "react-router-dom";

function UpdateScore() {
  const {
    loading,
    ballUpdate,
    battingTeam,
    striker,
    nonStriker,
    bowler,
    balls,
    over,
    ballNo,
    score,
    wickets,
    handelRuns,
    addWideRuns,
    addNbRuns,
    addByes,
    path,
    handelNonStrikerOut,
    handelStrikerOut,
  } = updateMatch();
  const navigate = useNavigate();

  useEffect(() => {
    const rout = path.current.split("/");
    rout.pop();
    const p = rout.join("/");

    if (!nonStriker) {
      navigate(p + "/selectnonstriker");
    }
    if (!bowler) {
      navigate(p + "/selectbowler");
    }
    if (!striker) {
      navigate(p + "/selectstriker");
    }
  }, [striker, nonStriker, bowler]);

  return (
    <>
      <div className="  sm:w-[70vw] shadow-2xl sm:ml-auto sm:mr-auto ">
        <div className="flex  items-center p-2  justify-between  bg-[#426f51] text-slate-200 ">
          <div className="flex flex-col items-center px-3">
            <p className="font-bold sm:text-2xl">{battingTeam?.name}</p>
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
          <div className="w-full h-18 flex overflow-x-scroll overflow-y-hidden scrollbar-hide ">
            {balls.map((ball, index) => {
              return (
                <Ball
                  key={`ball-${index}`}
                  value={ball.type}
                  runs={ball.runs}
                />
              );
            })}
          </div>
        </div>
        <div className={`grid grid-cols-4 gap-0.5 mt-2 `}>
          <InputUpdate value={0} onClick={handelRuns} disabled={ballUpdate} />
          <InputUpdate value={1} onClick={handelRuns} disabled={ballUpdate} />
          <InputUpdate value={2} onClick={handelRuns} disabled={ballUpdate} />

          <InputOut
            handelNonStrikerOut={handelNonStrikerOut}
            handelStrikerOut={handelStrikerOut}
            disabled={ballUpdate}
          />

          <InputUpdate value={3} onClick={handelRuns} disabled={ballUpdate} />
          <InputUpdate value={4} onClick={handelRuns} disabled={ballUpdate} />
          <InputUpdate value={6} onClick={handelRuns} disabled={ballUpdate} />
          <InputDialog
            value="Runs"
            onClick={handelRuns}
            disabled={ballUpdate}
          />
          <InputDialog value="Wd" onClick={addWideRuns} disabled={ballUpdate} />
          <InputDialog value="Nb" onClick={addNbRuns} disabled={ballUpdate} />
          <InputDialog value="Bye" onClick={addByes} disabled={ballUpdate} />
          <InputDialog value="Lb" onClick={addByes} disabled={ballUpdate} />
        </div>
      </div>
    </>
  );
}

export default UpdateScore;
