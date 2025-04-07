import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import instance from "../config/axios";

const LiveMatchContext = createContext(undefined);

export function LiveMatchProvider({ children }) {
  const { matchId } = useParams();
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const inningsId = useRef(null);
  const [striker, setStriker] = useState(null);
  const [nonStriker, setNonStriker] = useState(null);
  const [bowler, setBowler] = useState(null);
  const [balls, setBalls] = useState([]);
  const [ballNo, setBallNo] = useState(0);
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [over, setOver] = useState(0);
  const [batters, setBatters] = useState([]);
  const [bowlers, setBowlers] = useState([]);
  const [matchDetails, setMatchDetails] = useState({
    id: null,
    overs: null,
    target: null,
    innings2: true,
    status: "Upcoming",
  });
  const [innings1, setInnings1] = useState(null);
  const [innings2, setInnings2] = useState(null);

  useEffect(() => {
    const getTeam = async (batId, bowId) => {
      const batRes = await instance.get(`/teams/team/${batId}`);
      const bowRes = await instance.get(`/teams/team/${bowId}`);
      setTeamA(batRes.data);
      setTeamB(bowRes.data);
    };
    const getDetails = async () => {
      const match = await instance.get(`/matches/getmatch/${matchId}`);
      setMatchDetails(match.data);
      let inningsData1 = (await instance.get(`/matches/${matchId}/innings1`))
        .data;
      let inningsData2 = (await instance.get(`/matches/${matchId}/innings2`))
        .data;
      setInnings1(inningsData1);
      setInnings2(inningsData2);
      let inningsData;
      if (match.data.innings2) {
        inningsData = inningsData2;
      } else {
        inningsData = inningsData1;
      }
      setScore(inningsData.score);
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
      setWickets(inningsData.wickets);

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
  }, [matchDetails.innings2]);
  return (
    <LiveMatchContext.Provider
      value={{
        innings1,
        innings2,
        teamA,
        teamB,
        striker,
        nonStriker,
        bowler,
        bowlers,
        batters,
        ballNo,
        balls,
        wickets,
        over,
        score,
        matchDetails,
      }}
    >
      {children}
    </LiveMatchContext.Provider>
  );
}

export const liveMatch = () => {
  const context = useContext(LiveMatchContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
