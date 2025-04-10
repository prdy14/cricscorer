import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import instance from "../config/axios";

const UpdateMatchContext = createContext(undefined);

export function UpdateMatchProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const path = useRef(location.pathname);
  const [ballUpdate, setBallUpdated] = useState(false);

  const [battingTeam, setBattingTeam] = useState([]);
  const [bowlingTeam, setBowlingTeam] = useState([]);
  const inningsId = useRef(null);
  const [striker, setStriker] = useState(null);
  const [nonStriker, setNonStriker] = useState(null);
  const [bowler, setBowler] = useState(null);
  const [balls, setBalls] = useState([]);
  const [ballNo, setBallNo] = useState(0);
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [over, setOver] = useState(0);
  const [overId, setOverId] = useState(0);
  const [batters, setBatters] = useState([]);
  const [bowlers, setBowlers] = useState([]);
  const [matchDetails, setMatchDetails] = useState({
    id: null,
    overs: null,
    target: null,
    innings2: true,
    status: "Upcoming",
  });
  const [started, setStarted] = useState(false);
  const { matchId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTeam = async (batId, bowId) => {
      const batRes = await instance.get(`/teams/team/${batId}`);
      const bowRes = await instance.get(`/teams/team/${bowId}`);
      setBattingTeam(batRes.data);
      setBowlingTeam(bowRes.data);
    };
    const getDetails = async () => {
      const match = await instance.get(`/matches/getmatch/${matchId}`);
      setMatchDetails(match.data);
      let inningsData;
      if (!match.data.innings2) {
        inningsData = (await instance.get(`/matches/${matchId}/innings1`)).data;
      } else {
        inningsData = (await instance.get(`/matches/${matchId}/innings2`)).data;
      }

      setScore(inningsData.runs);
      const overs = inningsData.overs;
      setOver((prev) => {
        let c = 0;
        overs.forEach((ov) => {
          if (ov.completed) {
            c += 1;
          }
        });
        return c;
      });
      setBalls(overs.find((ov) => !ov.completed)?.balls || []);
      setBallNo(overs.find((ov) => !ov.completed)?.ballCount || 0);
      setOverId(overs.find((ov) => !ov.completed)?.id || 0);
      setWickets(inningsData.wickets);
      setStarted(inningsData.started);
      inningsId.current = inningsData.id;
      setStriker(inningsData.batters.find((bat) => bat.striker) || null);
      setNonStriker(
        inningsData.batters.find((bow) => !bow.out && !bow.striker) || null
      );
      setBowler(inningsData.bowlers.find((bow) => bow.bowling));
      setBatters(inningsData.batters);
      setBowlers(inningsData.bowlers);
      getTeam(inningsData.battingTeamId, inningsData.bowlingTeamId);
    };

    getDetails();
    setLoading(false);
  }, [matchDetails.innings2]);

  useEffect(() => {
    const updateScore = async () => {
      setBallUpdated(true);
      if (striker && nonStriker && bowler) {
        const updateInnings = await instance.post(`/matches/updateScore`, {
          id: inningsId.current,
          score: score,
          wickets: wickets,
        }); 
        const updateStriker = await instance.post(
          `/matches/updateBatter`,
          striker
        );
        const updateNonStriker = await instance.post(
          `/matches/updateBatter`,
          nonStriker
        );
        if (bowler) {
          const updateBowler = await instance.post(
            `/matches/updateBowler`,
            bowler
          );
          const res = await instance.post(`/matches/updatescore/addball`, {
            id: overId,
            ballNo: ballNo,
            balls: balls,
          });
        }
      }
      setBallUpdated(false);
    };

    updateScore();
    const updateOver = async () => {
      const dat = await instance.put(`/matches/overcomplete/${overId}`);
      setBowler(null);
      changeStriker();
    };
    if (ballNo == 6) {
      updateOver();
      setBallNo(0);
      setOver((prev) => prev + 1);
    }
    if (!matchDetails.innings2 && over == matchDetails.overs) {
      const res = instance.post("/matches/startsecondInnings", {
        id: matchDetails.id,
        target: score,
      });
      setMatchDetails((prev) => {
        return { ...prev, innings2: true, target: score };
      });
    }
    if (matchDetails.innings2 && over == matchDetails.overs) {
      if (score < matchDetails.target) {
        const res = instance.post("/matches/endmatch", {});
      }
    }
  }, [balls]);

  const handelSetStriker = async (bat) => {
    const srikerRes = await instance.post(
      `/matches/${inningsId.current}/setStriker`,
      { playerId: bat.playerId, name: bat.name }
    );
    setBatters((prev) => {
      return [...prev, srikerRes.data];
    });
    setStriker(srikerRes.data);
  };

  const handelSetNonStriker = async (nonBat) => {
    const nonSrikerRes = await instance.post(
      `/matches/${inningsId.current}/setnonStriker`,
      { playerId: nonBat.playerId, name: nonBat.name }
    );
    setBatters((prev) => {
      return [...prev, nonSrikerRes.data];
    });
    setNonStriker(nonSrikerRes.data);
  };
  const handelSetBowler = async (bow) => {
    const bowlerRes = await instance.post(
      `/matches/${inningsId.current}/setbowler`,
      { playerId: bow.playerId, name: bow.name }
    );
    const startOver = await instance.post(
      `/matches/${inningsId.current}/startOver/${bowlerRes.data.id}`
    );
    setBowler(bowlerRes.data);
    setOverId(startOver.data.id);
    setBalls([]);
  };

  const addBall = async (value, runs) => {
    setBalls((prev) => [...prev, { type: value, runs: runs }]);
  };

  const changeStriker = () => {
    const newStriker = { ...striker };
    setStriker({ ...nonStriker, striker: true });
    setNonStriker({ ...newStriker, striker: false });
  };
  const handelRuns = async (r) => {
    let val = "dot";
    if (r == 4) {
      val = "four";
    } else if (r == 6) {
      val = "six";
    }
    if (r % 2 == 0) {
      setStriker((prev) => {
        return {
          ...prev,
          balls: prev.balls + 1,
          runs: prev.runs + r,
          fours: r == 4 ? prev.fours + 1 : prev.fours,
          sixes: r == 6 ? prev.sixes + 1 : prev.sixes,
        };
      });
    } else {
      changeStriker();
      setNonStriker((prev) => {
        return { ...prev, balls: prev.balls + 1, runs: prev.runs + r };
      });
    }
    setScore((prev) => prev + r);
    setBowler((prev) => {
      return {
        ...prev,
        overs:
          prev.overs + ((prev.overs * 10).toFixed(0) % 10 == 5 ? 0.5 : 0.1),
        runs: prev.runs + r,
      };
    });
    setBallNo((prev) => prev + 1);
    addBall(val, r);
  };

  const handelStrikerOut = async () => {
    console.log(batters);
    const res = await instance.patch(`/matches/out`, {
      inningsId: inningsId.current,
      batterId: striker.id,
      bowlerId: bowler.id,
    });
    setWickets((prev) => prev + 1);
    addBall("out", "W");
    setBallNo((prev) => prev + 1);
    setStriker(null);
  };

  const handelNonStrikerOut = async () => {
    const res = await instance.patch(`/matches/out`, {
      inningsId: inningsId.current,
      batterId: nonStriker.id,
      bowlerId: bowler.id,
    });
    setWickets((prev) => prev + 1);
    addBall("out", "W");
    setBallNo((prev) => prev + 1);
    setNonStriker(null);
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
    setBowler((prev) => {
      return {
        ...prev,
        overs:
          prev.overs + ((prev.overs * 10).toFixed(0) % 10 == 5 ? 0.5 : 0.1),
      };
    });
    setBallNo((prev) => prev + 1);
    addBall("lb", r);
  };

  return (
    <UpdateMatchContext.Provider
      value={{
        setBatters,
        battingTeam,
        bowlingTeam,
        handelSetStriker,
        setStriker,
        setNonStriker,
        setBowler,
        loading,
        ballUpdate,
        path,
        striker,
        nonStriker,
        bowler,
        balls,
        over,
        ballNo,
        score,
        wickets,
        batters,
        bowlers,
        setBowlers,
        matchDetails,
        handelRuns,
        addWideRuns,
        addNbRuns,
        addByes,
        addBall,
        setOver,
        started,
        setStarted,
        handelSetBowler,
        handelSetNonStriker,
        navigate,
        handelNonStrikerOut,
        handelStrikerOut,
      }}
    >
      {children}
    </UpdateMatchContext.Provider>
  );
}

export const updateMatch = () => {
  const context = useContext(UpdateMatchContext);
  if (!context) {
    throw new Error("updateMatch should be in provider");
  }
  return context;
};
