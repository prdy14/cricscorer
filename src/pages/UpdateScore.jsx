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

function UpdateScore() {
  const {
    battingTeam,
    bowlingTeam,
    striker,
    nonStriker,
    bowler,
    balls,
    over,
    ballNo,
    setOver,
    score,
    wickets,
    batters,
    started,
    setStarted,
    bowlers,
    matchDetails,
    handelRuns,
    addWideRuns,
    addNbRuns,
    addByes,
    addBall,
    setStriker,
    setBowler,
    setNonStriker,
    setBatters,
  } = updateMatch();

  console.log(battingTeam);

  return (
    <>
      {!started ? (
        <>
          <div>
            <h1>Select Striker</h1>
            <Select
              onValueChange={(value) => {
                setStriker((val) => {
                  return { ...val, ...value };
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Striker" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {battingTeam?.players
                    .filter((player) => batters.indexOf(player.id) < 0)
                    .map((player, index) => {
                      return (
                        <SelectItem
                          value={player}
                          key={`${player.name}-${index}`}
                        >
                          {player.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <h1>Select Non-Striker</h1>
            <Select
              onValueChange={(value) => {
                setNonStriker((val) => ({ ...val, ...value }));
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Non-Striker" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {battingTeam?.players
                    .filter(
                      (player) =>
                        batters.indexOf(player.id) < 0 &&
                        striker?.id != player.id
                    )
                    .map((player, index) => {
                      return (
                        <SelectItem
                          value={player}
                          key={`${player.name}-${index}`}
                        >
                          {player.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <h1>Select Bowler</h1>
            <Select
              onValueChange={(value) => {
                setBowler({ ...bowler, ...value });
                setStarted(true);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Bowler" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bowlingTeam?.players.map((player, index) => {
                    return (
                      <SelectItem
                        value={player}
                        key={`${player.name}-d${index}`}
                      >
                        {player.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              onClick={async () => {
                setBatters((prev) => [...prev, striker, nonStriker]);
                setStarted(true);
              }}
            />
          </div>
        </>
      ) : (
        <div className="  sm:w-[70vw] shadow-2xl sm:ml-auto sm:mr-auto ">
          <div className="flex  items-center p-2  justify-between  bg-[#426f51] text-slate-200 ">
            <div className="flex flex-col items-center px-3">
              <p className="font-bold sm:text-2xl">{battingTeam.name}</p>
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
              runs={striker.runs}
              balls={striker.balls}
              fours={striker.fours}
              sixs={striker.sixs}
              sr={
                striker.balls == 0
                  ? 0
                  : ((striker.runs * 100) / striker.balls).toFixed(1)
              }
              name={striker.name + "*"}
            />
            <BatterPerformance
              runs={nonStriker.runs}
              balls={nonStriker.balls}
              fours={nonStriker.fours}
              sixs={nonStriker.sixs}
              sr={
                nonStriker.balls == 0
                  ? 0
                  : ((nonStriker.runs * 100) / nonStriker.balls).toFixed(1)
              }
              name={nonStriker.name}
            />
            <BowlerTitle />
            <BowlerPerformence
              name={bowler.name}
              overs={bowler.overs.toFixed(1)}
              runs={bowler.runs}
              wickets={bowler.wickets}
              madien={bowler.madiens}
              eco={
                bowler.overs != 0
                  ? (
                      (bowler.runs * 6) /
                      (6 * Math.floor(bowler.overs + 0.0001) + ballNo)
                    ).toFixed(1)
                  : 0
              }
            />
            <Title name={"Current Over"} />
            <div className="w-full h-12 flex overflow-x-scroll overflow-y-hidden scrollbar-hide ">
              {balls.map((ball, index) => {
                return (
                  <Ball
                    key={`ball-${index}`}
                    value={ball.value}
                    runs={ball.runs}
                  />
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-0.5 mt-2">
            <InputUpdate value={0} onClick={handelRuns} />
            <InputUpdate value={1} onClick={handelRuns} />
            <InputUpdate value={2} onClick={handelRuns} />

            <InputOut value={2} onClick={handelRuns} />

            <InputUpdate value={3} onClick={handelRuns} />
            <InputUpdate value={4} onClick={handelRuns} />
            <InputUpdate value={6} onClick={handelRuns} />
            <InputDialog value="Runs" onClick={handelRuns} />
            <InputDialog value="Wd" onClick={addWideRuns} />
            <InputDialog value="Nb" onClick={addNbRuns} />
            <InputDialog value="Bye" onClick={addByes} />
            <InputDialog value="Lb" onClick={addByes} />
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateScore;
