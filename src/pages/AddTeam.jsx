import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "../config/axios";
import { Separator } from "../components/ui/separator";

function AddTeam() {
  const [searched, setSearched] = useState(false);
  const [playerExist, setPlayerExist] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [players, setPlayers] = useState([]);
  const [username, setUsername] = useState("");
  const [addPlayer, setAddPlayer] = useState(null);
  const [team, setTeam] = useState(null);

  const handelChange = (e) => {
    if (e.target.name == "teamName") {
      setTeamName(e.target.value);
    } else if (e.target.name == "location") {
      setLocation(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "username") {
      setUsername(e.target.value);
    }
  };

  const addPlayerToTeam = async () => {
    if (!playerExist) {
      try {
        const res = await axios.post("/player/addPlayer", {
          username: username,
          email: email,
        });

        const player = res.data;

        // Ensure setAddPlayer updates before using it
        setAddPlayer(player);
        const add = await axios.put(
          `/teams/addPlayer/${team.id}/${player.id}`,
          {}
        );

        // Use a callback inside setPlayers to ensure it gets the latest state
        console.log(players);
        setPlayers((prevPlayers) => [...prevPlayers, player]);

        // Might still log old value due to async state updates
      } catch (err) {}
    } else {
      console.log(addPlayer.id);
      const add = await axios.put(
        `/teams/addPlayer/${team.id}/${addPlayer.id}`,
        {}
      );

      setPlayers((prevPlayers) => [...prevPlayers, addPlayer]);
    }

    setSearched(false);
    setAddPlayer(null);
    setPlayerExist(false);
  };
  const handelCreateTeam = async () => {
    try {
      const response = await axios.post("/teams/createteam", {
        teamName: teamName,
        location: location,
        playersId: [],
      });
      setTeam(response.data);
    } catch (e) {}
  };
  const findPlayer = async () => {
    try {
      const response = await axios.get(`/player/getplayer?email=${email}`);
      const player = response.data;

      setSearched(true);
      if (player) {
        setPlayerExist(true);
        setAddPlayer(player);
      } else {
      }
    } catch (e) {}
  };
  return (
    <div className="flex flex-col justify-center items-center sm:block ">
      {!team ? (
        <>
          <h1 className="pl-5 font-bold text-2xl sm:text-3xl text-[#426f51] mt-2">
            Create Team
          </h1>
          <div className="m-2 pb-3 flex flex-col sm:flex-row  items-center w-[95vw] ">
            <div className="mr-4 w-[85vw] sm:w-[250px]">
              <Label htmlFor="teamName" className="p-2 ml-2">
                Teamname
              </Label>
              <Input
                type="text"
                id="teamName"
                placeholder="TeamName"
                className="  max-w-[350px] ml-2"
                name="teamName"
                onChange={handelChange}
              />
            </div>
            <div className="mr-4 w-[85vw] sm:w-[250px]">
              <Label htmlFor="location" className="p-2 mt-2 ml-2 sm:mt-0">
                Location
              </Label>
              <Input
                type="text"
                id="location"
                placeholder="Location"
                className=" max-w-[350px] ml-2"
                name="location"
                onChange={handelChange}
              />
            </div>
            <Button
              onClick={handelCreateTeam}
              className="w-40 mt-5 sm:mt-7 bg-[#426f51] border-2  cursor-pointer border-[#426f51] hover:bg-white hover:text-[#426f51]"
            >
              CREATE TEAM
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="pl-5 pt-2 self-start text-xl font-bold text-[#426f51] mb-5">
            Team name : {team?.name}
          </p>
        </>
      )}
      <Separator />
      <div className="m-2 pb-3 flex flex-col sm:flex-row  items-center w-[95vw]">
        {!playerExist && (
          <div className="mr-4 w-[85vw] sm:w-[250px]">
            <Label htmlFor="email" className="p-2 mt-2 ml-2 sm:mt-0">
              Email
            </Label>
            <Input
              type="email"
              id="eamil"
              placeholder="@gmail.com"
              className=" max-w-[350px] ml-2"
              name="email"
              onChange={handelChange}
            />
          </div>
        )}
        {searched &&
          (!playerExist ? (
            <div className="mr-4 w-[85vw] sm:w-[250px]">
              <Label htmlFor="name" className="p-2 mt-2 sm:mt-0">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="name"
                className="max-w-[350px]"
                name="username"
                onChange={handelChange}
              />
            </div>
          ) : (
            <div className=" mx-2 px-2 py-1 sm:mt-7 mt-4 flex rounded-[4px] border-gray-200 shadow-sm items-center w-[85vw] sm:w-[250px] bg-white">
              <div className="h-10 w-10 rounded-full bg-[#426f51]"></div>
              <div className="flex flex-col px-2">
                <div className="font-semibold ">{addPlayer?.name}</div>
                <div className="text-sm text-gray-500">Batter</div>
              </div>
            </div>
          ))}
        <Button
          className="w-40 mt-5 sm:mt-7 bg-[#426f51] border-2  cursor-pointer border-[#426f51] hover:bg-white hover:text-[#426f51]"
          onClick={searched ? addPlayerToTeam : findPlayer}
        >
          ADD PLAYER
        </Button>
      </div>
      <h1 className="pl-5 font-bold text-2xl sm:text-3xl text-[#426f51] mt-4">
        Players
      </h1>
      <div className="flex sm:grid flex-col p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {players.map((player1, index) => {
          return (
            <div
              key={index}
              className="p-3 m-0.5  flex rounded-sm border-gray-200 shadow-sm items-center max-w-[400px] bg-white"
            >
              <div className="h-14 w-14 rounded-full bg-[#426f51]"></div>
              <div className="font-semibold text-xl sm:text-2xl ml-4">
                {player1?.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AddTeam;
