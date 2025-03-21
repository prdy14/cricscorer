import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectPlayer() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {battingTeam
            .filter((player) => battingCompleted.indexOf(player.id) < 0)
            .map((player, index) => {
              return (
                <SelectItem value={player} key={`${player.name}-${index}`}>
                  {player.name}
                </SelectItem>
              );
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectPlayer;
