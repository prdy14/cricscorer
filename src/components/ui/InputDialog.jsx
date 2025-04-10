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
import { useState } from "react";

export default function InputDialog({ value, onClick, disabled }) {
  const [runs, setRuns] = useState(0);
  const handelChange = (e) => {
    console.log(runs);
    setRuns(e.target.value == "" ? 0 : +e.target.value);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <InputUpdate
          value={value}
          className="bg-[#45815951] text-black"
          disabled={disabled}
        />
      </DialogTrigger>
      <DialogContent className="max-w-[300px] items-center flex flex-col">
        <DialogHeader className="flex items-center">
          <DialogTitle>{value} Runs</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Label htmlFor="runs" className="text-right">
            {value == "WD" || value == "Nb" ? value + " +" : ""} Runs :
          </Label>
          <Input
            id="runs"
            className="w-[30%] ml-2"
            name="runs"
            type="number"
            onChange={handelChange}
          />
        </div>

        <DialogClose
          className="bg-[#426f51] hover:text-[#426f51] hover:bg-white hover:border-[#426f51] rounded-sm border-2 border-[#426f51] w-[40%] p-1 text-white"
          onClick={() => {
            onClick(runs);
            setRuns(0);
          }}
        >
          Add Runs
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
