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

import InputUpdate from "./InputUpdate";

function InputOut({ handelNonStrikerOut, handelStrikerOut, disabled }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <InputUpdate
          value="OUT"
          className=" bg-[#dc9b9b] text-black"
          disabled={disabled}
        />
      </DialogTrigger>
      <DialogContent className="max-w-[300px] items-center flex flex-col">
        <DialogHeader className="flex items-center">
          <DialogTitle>OUT</DialogTitle>
          <DialogDescription>who was out</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 w-full">
          <DialogClose
            className="bg-[#426f51] hover:text-[#426f51] hover:bg-white hover:border-[#426f51] rounded-sm border-2 border-[#426f51] w-[80%] p-1 text-white"
            onClick={() => {
              handelStrikerOut();
            }}
          >
            striker
          </DialogClose>
          <DialogClose
            className="bg-[#426f51] hover:text-[#426f51] hover:bg-white hover:border-[#426f51] rounded-sm border-2 border-[#426f51] w-[80%] p-1 text-white"
            onClick={() => {
              handelNonStrikerOut();
            }}
          >
            nonstriker
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InputOut;
