import {
  Link,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import axios from "../config/axios";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { createMatch } from "../context/MatchContext";

function MyTeams() {
  const [teams, setTeams] = useState([]);
  const { teamA, teamB, handelInputChange } = createMatch();
  const [selectedTeams, setSelectedTeams] = useState([teamA, teamB]);
  const navigate = useNavigate();
  useEffect(() => {
    const getTeams = () => {
      axios
        .get("/teams/teams")
        .then((result) => setTeams(result.data))
        .catch((err) => {});
    };
    getTeams();
  }, []);

  const handleSelectTeam = (team) => {
    if (selectedTeams.length < 2) {
      setSelectedTeams((prev) => [...prev, team]);
    } else if (
      team?.teamId == selectedTeams[0]?.teamId ||
      team?.teamId == selectedTeams[1]?.teamId
    ) {
      alert("You can't select the same team twice");
    } else {
      const newTeams = [...selectedTeams];
      newTeams.shift();
      newTeams.push(team);
      setSelectedTeams(newTeams);
    }
  };

  return (
    <>
      <div className="flex sm:grid flex-col p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  bg-gray-50">
        {teams.map((team, index) => {
          return (
            <div
              className={`p-1 mt-0.5 h-16 flex rounded-[5px] border-gray-200 shadow-sm items-center max-w-[400px] bg-white border-2 ${
                selectedTeams[0]?.teamId == team?.teamId ||
                selectedTeams[1]?.teamId == team?.teamId
                  ? "border-green-800 "
                  : ""
              }`}
              key={index}
              onClick={() => {
                handleSelectTeam(team);
              }}
            >
              <Avatar className="w-11 h-11">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col px-3 w-full">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text ">{team.teamName}</p>
                  <Link className="text-xs font-semibold underline text-[#083f27]">
                    Members
                  </Link>
                </div>
                <div className="text-gray-500 text-xs">{team.teamName}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center w-full">
        <Button
          className="w-20 hover:bg-white text-white px-6 py-3 rounded-lg  font-semibold transition-colors shadow-lg bg-[#426f51] hover:text-[#083f27] cursor-pointer"
          onClick={() => {
            if (selectedTeams.length < 2) {
              alert("Please select at least 2 teams");
              return;
            }

            handelInputChange({
              target: { name: "teamA", value: selectedTeams[0] },
            });
            handelInputChange({
              target: { name: "teamB", value: selectedTeams[1] },
            });
            navigate("/startmatch");
          }}
        >
          ok
        </Button>
      </div>
    </>
  );
}

export default MyTeams;
