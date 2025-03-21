import { createContext, useEffect, useRef, useState } from "react";
import axios from "../config/axios";
import { useParams } from "react-router-dom";

const updateMatchContext = createContext(undefined);

function updateMatchProvider({ children }) {
  const inningsId = useRef(0);
  const [battingTeam, setBattingTeam] = useState(null);
  const [bowlingTeam, setBowlingTeam] = useState(null);
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
  const [totalOvers, setTotalOvers] = useState(0);
  const { id } = useParams;

  useEffect(() => {
    async function getMatchDetails(id) {
      const response = await axios.get(`/innings/${id}`);
      setMatch(response.data);
    }
    console.log(id);
    //getMatchDetails(id);
  }, inningsId);
  return <updateMatchContext.Provider>{children}</updateMatchContext.Provider>;
}
