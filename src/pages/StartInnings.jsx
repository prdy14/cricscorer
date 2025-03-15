import React from "react";
import AlertDialogDemo from "../components/Alert";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function StartInnings({}) {
  return (
    <div className="flex justify-center flex-col">
      <div className=" z-50 sticky top-0 flex items-center  bg-[#426f51] px-2 sm:px-6">
        <AlertDialogDemo title="BACK" />
        <h1 className="text-center text-xl sm:text-2xl bg-[#426f51] font-semibold py-4 text-white mr-auto ml-auto ">
          start innings
        </h1>
        <Button
          disabled={false}
          className=" bg-white text-black hover:bg-gray-100 hover:text-black"
        >
          DONE
        </Button>
      </div>
      <div>
        <h1>choose stricker and non-strincker</h1>
        <Select>
          <SelectTrigger className="w-[100%]">
            <SelectValue placeholder="Toss won by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="teamA">"Team A"</SelectItem>
              <SelectItem value="teamB">"Team B"</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default StartInnings;
