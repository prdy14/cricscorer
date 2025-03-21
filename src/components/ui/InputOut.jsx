import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputUpdate from "./InputUpdate";
import { Button } from "./button";

function InputOut({ value, onClick }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <InputUpdate value="OUT" className=" bg-[#dc9b9b] text-black" />
      </DialogTrigger>
      <DialogContent className="max-w-[300px] items-center flex flex-col">
        <DialogHeader className="flex items-center">
          <DialogTitle>OUT</DialogTitle>
          <DialogDescription>Select Out Type</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 w-full">
          <DialogClose
            className="bg-[#426f51] hover:text-[#426f51] hover:bg-white hover:border-[#426f51] rounded-sm border-2 border-[#426f51] w-[80%] p-1 text-white"
            onClick={() => {
              onClick();
              setRuns(0);
            }}
          >
            Bowled
          </DialogClose>
          <div>caugth</div>
          <div>runout</div>
          <div>Lbw</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InputOut;
