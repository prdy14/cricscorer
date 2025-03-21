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
import { useNavigate, useParams } from "react-router-dom";

function UpdateScore() {
  const { id } = useParams();
  const [battingTeam, SetBattingTeam] = useState({
    id: 1,
    name: "RCB",
    player: [
      {
        id: 5,
        name: "admin",
      },
      {
        id: 2,
        name: "admin",
      },
      {
        id: 1,
        name: "praveenkandela",
      },
      {
        id: 6,
        name: "sathevva",
      },
    ],
  });
  const [bowlingTeam, setBowlingTeam] = useState({
    id: 1,
    name: "RCB",
    player: [
      {
        id: 7,
        name: "admin2",
      },
      {
        id: 9,
        name: "admin11",
      },
      {
        id: 4,
        name: "praveenkandela",
      },
      {
        id: 2,
        name: "sathevva",
      },
    ],
  });
  const [striker, setStriker] = useState({
    id: null,
    name: "",
    runs: 0,
    balls: 0,
    fours: 0,
    sixs: 0,
  });
  const [nonStriker, setNonStriker] = useState({
    id: null,
    name: "",
    runs: 0,
    balls: 0,
    fours: 0,
    sixs: 0,
  });
  const [bowler, setBowler] = useState({
    id: null,
    name: "",
    overs: 0,
    runs: 0,
    wickets: 0,
    madiens: 0,
    eco: 0,
  });
  const [flag, setFlag] = useState(false);
  const [balls, setBalls] = useState([]);
  const [ballNo, setBallNo] = useState(0);
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [over, SetOver] = useState(0);
  const [battingCompleted, setBattingCompleted] = useState([]);

  useEffect(() => {
    async function getMatchDetails(id) {
      const response = await axios.get(`/innings/${id}`);
      setMatch(response.data);
    }
    console.log("use");
    // getMatchDetails(id);
  }, [id]);

  const addBall = (value, runs) => {
    setBalls((prev) => [...prev, { value: value, runs: runs }]);
  };

  const changeStriker = () => {
    const newStriker = { ...striker };
    setStriker({ ...nonStriker });
    setNonStriker({ ...newStriker });
  };
  const handelRuns = (r) => {
    let val = "dot";
    if (r == 4) {
      val = "four";
    } else if (r == 6) {
      val = "six";
    }
    if (r % 2 == 0) {
      if (ballNo == 5) {
        changeStriker();
        setNonStriker((prev) => {
          return { ...prev, balls: prev.balls + 1, runs: prev.runs + r };
        });
      } else {
        setStriker((prev) => {
          return {
            ...prev,
            balls: prev.balls + 1,
            runs: prev.runs + r,
            fours: r == 4 ? prev.fours + 1 : prev.fours,
            sixs: r == 6 ? prev.sixs + 1 : prev.sixs,
          };
        });
      }
    } else {
      if (ballNo == 5) {
        setStriker((prev) => {
          return {
            ...prev,
            balls: prev.balls + 1,
            runs: prev.runs + r,
          };
        });
      } else {
        changeStriker();
        setNonStriker((prev) => {
          return { ...prev, balls: prev.balls + 1, runs: prev.runs + r };
        });
      }
    }
    addBall(val, r);
    setBallNo((prev) => {
      if (prev == 5) {
        SetOver((no) => no + 1);
        setBalls([]);
        return 0;
      } else {
        return prev + 1;
      }
    });

    setScore((prev) => prev + r);
    setBowler((prev) => {
      return {
        ...prev,
        overs:
          prev.overs + ((prev.overs * 10).toFixed(0) % 10 == 5 ? 0.5 : 0.1),
        runs: prev.runs + r,
      };
    });
  };
  const addWideRuns = (r) => {
    setScore((prev) => prev + 1 + +r);
    if (r % 2 == 1) {
      changeStriker();
    }
    addBall("wd", r);
  };
  const addNbRuns = (r) => {
    setScore((prev) => prev + 1 + +r);
    if (r % 2 == 1) {
      changeStriker();
      setNonStriker((prev) => {
        return { ...prev, balls: prev.balls + 1, runs: prev.runs + +r };
      });
    } else {
      setStriker((prev) => {
        return { ...prev, balls: prev.balls + 1, runs: prev.runs + +r };
      });
    }
    setBowler((prev) => {
      return { ...prev, runs: prev.runs + +r };
    });
    addBall("nb", r);
  };
  const addByes = (r) => {
    setScore((prev) => prev + +r);
    if (r % 2 == 1) {
      if (ballNo == 5) {
        setStriker((prev) => {
          return {
            ...prev,
            balls: prev.balls + 1,
          };
        });
      } else {
        changeStriker();
        setNonStriker((prev) => {
          return { ...prev, balls: prev.balls + 1 };
        });
      }
    } else {
      setStriker((prev) => {
        return { ...prev, balls: prev.balls + 1 };
      });
    }
    setBallNo((prev) => {
      if (prev == 5) {
        SetOver((no) => no + 1);
        setBalls([]);
        return 0;
      } else {
        return prev + 1;
      }
    });
    setBowler((prev) => {
      return {
        ...prev,
        overs:
          prev.overs + ((prev.overs * 10).toFixed(0) % 10 == 5 ? 0.5 : 0.1),
      };
    });
    addBall("lb", r);
  };
  const navigate = useNavigate();

  return (
    <>
      {!flag ? (
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
                  {battingTeam.player
                    .filter((player) => battingCompleted.indexOf(player.id) < 0)
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
                  {battingTeam.player
                    .filter(
                      (player) =>
                        battingCompleted.indexOf(player.id) < 0 &&
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
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Bowler" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bowlingTeam.player.map((player, index) => {
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
              onClick={() => {
                setBattingCompleted((prev) => [...prev, striker, nonStriker]);
                setFlag(true);
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
