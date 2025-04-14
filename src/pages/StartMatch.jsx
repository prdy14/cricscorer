import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { createMatch } from "../context/MatchContext";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import axios from "../config/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Venus } from "lucide-react";

function StartMatch() {
  const { formdata, handelInputChange } = createMatch();
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const navigateToaddTeam = () => {
    navigate(`/startmatch/selectteam/myteams`);
  };

  const staryMatch = async (e) => {
    if (
      formdata.teamA &&
      formdata.teamB &&
      formdata.optto &&
      formdata.overs &&
      formdata.overs
    ) {
      const res = await axios.post("/matches/creatematch", {
        teams: [
          {
            id: formdata.teamA.teamId,
            name: formdata.teamA.teamName,
            player: formdata.teamA.players,
          },
          {
            id: formdata.teamB.teamId,
            name: formdata.teamB.teamName,
            players: formdata.teamB.players,
          },
        ],
        venue: formdata.venue,
        optTo: formdata.optto,
        overs: +formdata.overs,
        tossWon:
          formdata.toss == "teamA"
            ? formdata.teamA.teamId
            : formdata.teamB.teamId,
      });

      navigate(`/updatematch/${res.data.id}/updatescore`);
    } else {
      setError(true);
    }
  };
  return (
    <div className="md:mx-60">
      <div className="flex justify-evenly p-5">
        <div className="flex justify-center flex-col items-center p-5">
          {formdata.teamA ? (
            <Avatar className="h-30 w-30 mb-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <div
              onClick={navigateToaddTeam}
              className="bg-gray-200 h-30 w-30 rounded-full flex items-center justify-center mb-5"
            >
              <div className="h-1 w-5 bg-gray-800"></div>
              <div className="h-1 w-5 bg-gray-800 absolute rotate-90"></div>
            </div>
          )}
          <Button
            className="bg-[#426f51] hover:text-[#426f51] hover:bg-white hover:border-[#426f51] border-2 border-[#426f51]"
            onClick={navigateToaddTeam}
          >
            {formdata.teamA ? formdata.teamA.teamName : "Add team"}
          </Button>
        </div>
        <div></div>
        <div className="flex justify-center flex-col items-center p-5">
          {formdata.teamB ? (
            <Avatar className="h-30 w-30 mb-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <div
              onClick={navigateToaddTeam}
              className="bg-gray-200 h-30 w-30 rounded-full flex items-center justify-center mb-5"
            >
              <div className="h-1 w-5 bg-gray-800"></div>
              <div className="h-1 w-5 bg-gray-800 absolute rotate-90"></div>
            </div>
          )}
          <Button
            className="bg-[#426f51] hover:text-[#426f51] hover:bg-white hover:border-[#426f51] border-2 border-[#426f51]"
            onClick={navigateToaddTeam}
          >
            {formdata.teamB ? formdata.teamB.teamName : "Add team"}
          </Button>
        </div>
      </div>
      <div className="w-full">
        <form
          action={staryMatch}
          className="flex justify-center flex-col items-center "
        >
          <div className="flex flex-col min-w-[350px] mb-2">
            <div className="grid  gap-1.5 max-w-[350px]">
              <Label htmlFor="overs" className="pl-3 ">
                Overs
              </Label>
              <Input
                type="number"
                id="overs"
                name="overs"
                placeholder="Number of Overs"
                onChange={handelInputChange}
              />
            </div>
            <div className="grid max-w-sm items-center gap-1.5 mt-2 w-full">
              <Label htmlFor="venue" className="pl-3">
                Venue
              </Label>
              <Input
                type="text"
                id="venue"
                name="venue"
                placeholder="venue"
                onChange={handelInputChange}
              />
            </div>
            <div className="flex">
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-3 mr-2">
                <Label htmlFor="toss" className="pl-3">
                  Toss
                </Label>
                <Select
                  onValueChange={(value) =>
                    handelInputChange({ target: { name: "toss", value } })
                  }
                >
                  <SelectTrigger className="w-[100%]">
                    <SelectValue placeholder="Toss won by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="teamA">
                        {formdata.teamA ? formdata.teamA.teamName : "Team A"}
                      </SelectItem>
                      <SelectItem value="teamB">
                        {formdata.teamB ? formdata.teamB.teamName : "Team B"}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-3 ">
                <Label htmlFor="opt" className="pl-3">
                  Opt To
                </Label>
                <Select
                  onValueChange={(value) =>
                    handelInputChange({ target: { name: "optto", value } })
                  }
                >
                  <SelectTrigger className="w-[100%]">
                    <SelectValue placeholder="Opt TO" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Bat">Bat</SelectItem>
                      <SelectItem value="Ball">Ball</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {error && <p className=" text-red-600">please fill all the feilds</p>}
          <Button
            className="w-60 mt-3 bg-[#426f51] hover:text-[#426f51] hover:bg-white hover:border-[#426f51] border-2 border-[#426f51]"
            type="submit"
          >
            Start Match
          </Button>
        </form>
      </div>
    </div>
  );
}

export default StartMatch;
