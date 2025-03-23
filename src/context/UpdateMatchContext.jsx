import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../config/axios";

const UpdateMatchContext = createContext(undefined);

export function UpdateMatchProvider({ children }) {
  const [battingTeam, setBattingTeam] = useState(null);
  const [bowlingTeam, setBowlingTeam] = useState(null);
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
  const [balls, setBalls] = useState([]);
  const [ballNo, setBallNo] = useState(0);
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [over, setOver] = useState(0);
  const [overs, setOvers] = useState(0);
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
      console.log(batRes.data, bowRes.data);

      setBattingTeam(batRes.data);
      setBowlingTeam(bowRes.data);
    };
    const getDetails = async () => {
      console.log(matchId);
      const match = await instance.get(`/matches/getmatch/${matchId}`);
      setMatchDetails(match.data);
      console.log(match.data);
      let inningsData;
      if (!match.data.innings2) {
        inningsData = await instance.get(`/matches/${matchId}/innings1`);
      } else {
        inningsData = await instance.get(`/matches/${matchId}/innings2`);
      }
      console.log(inningsData.data);
      setScore(inningsData.data.runs);
      setOver(inningsData.data.overs.length);
      setOvers(inningsData.data.overs);
      setWickets(inningsData.data.wickets);
      setStarted(inningsData.data.started);
      setBallNo(
        inningsData.data.overs[inningsData.data.overs.length - 1]?.ballCount ||
          0
      );
      setBalls(
        inningsData.data.overs[inningsData.data.overs.length - 1]?.balls || []
      );
      setBatters(inningsData.data.batters);
      setBowlers(inningsData.data.bowlers);
      getTeam(inningsData.data.battingTeamId, inningsData.data.bowlingTeamId);
    };

    getDetails();
  }, [matchId]);

  const addBall = async (value, runs) => {
    setBalls((prev) => [...prev, { type: value, runs: runs }]);
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
        setOver((no) => no + 1);
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

  return (
    <UpdateMatchContext.Provider
      value={{
        setBatters,
        battingTeam,
        bowlingTeam,
        setStriker,
        setNonStriker,
        setBowler,
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
        matchDetails,
        handelRuns,
        addWideRuns,
        addNbRuns,
        addByes,
        addBall,
        setOver,
        started,
        setStarted,
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
