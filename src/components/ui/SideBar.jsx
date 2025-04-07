import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import logo from "../../assets/user.svg";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { SeparatorHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export function SideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className=" cursor-pointer p-2 mr-2 ">
          <div className="h-1 bg-white w-7 m-1 rounded"></div>
          <div className="h-1 bg-white w-7 m-1 rounded"></div>
          <div className="h-1 bg-white w-7 m-1 rounded"></div>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] gap-0 overflow-y-scroll">
        <SheetHeader className="p-2 pt-5 pb-5  bg-[#426f51]">
          <SheetTitle>
            <div className="flex">
              <div>
                <Avatar className="w-16 h-16 bg-white items-center flex justify-center">
                  <AvatarImage src={logo} alt="@shadcn" className="w-10" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col justify-center  pl-3 text-white">
                <p>Praveen</p>
                <p className="text-xs font-extralight">praveen@gmail.com</p>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="grid">
          <Link className="w-full" to={"/"}>
            <SheetClose className="w-full p-2 text-md hover:bg-[#426f5153] block text-start">
              Home
            </SheetClose>
          </Link>
          <Link className="w-full" to={"/livematches"}>
            <SheetClose className="w-full p-2 text-md hover:bg-[#426f5153] block text-start">
              live matches
            </SheetClose>
          </Link>
          <Link className="w-full" to={"/startmatch"}>
            <SheetClose className="w-full p-2 text-md hover:bg-[#426f5153] block text-start">
              Start Match
            </SheetClose>
          </Link>
          <Link className="w-full" to={"/updatematch"}>
            <SheetClose className="w-full p-2 text-md hover:bg-[#426f5153] block text-start">
              Update match
            </SheetClose>
          </Link>

          <hr />
          <div className="bg-[#264f3912] p-2 font-semibold text-sm">
            MY STATS
          </div>
          <Link
            className="p-2 text-md hover:bg-[#426f5153]"
            to={"/updatematch"}
          >
            My matches
          </Link>
          <Link
            className="p-2 text-md hover:bg-[#426f5153]"
            to={"/updatematch"}
          >
            My Performance
          </Link>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
