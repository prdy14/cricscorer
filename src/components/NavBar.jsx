import React from "react";
import logo from "../assets/logo1.png";
import Search from "./ui/Search";
import Tabs from "./ui/Tabs";
import bell from "../assets/bell-regular.svg";
import Icon from "./ui/Icon";
import ProfilePhoto from "./ui/ProfilePhoto";
import search from "../assets/searchIcon1.svg";

function NavBar() {
  const tabs = [
    { name: "Matches", link: "/matches" },
    { name: "Teams", link: "/team" },
    { name: "About us", link: "/aboutus" },
  ];
  return (
    <>
      <div className="c rounded px-5">
        <div className="p-2 flex justify-between items-center">
          <div className="my-1">
            <img src={logo} alt="" width={120} />
          </div>
          <div className="hidden sm:block">
            <Search />
          </div>
          <div className="flex">
            <div
              className="rounded-full flex
            justify-center items-center mr-2 sm:hidden cursor-pointer"
            >
              <Icon icon={search} w={20} />
            </div>
            <div
              className="h-10 w-10 rounded-full flex
            justify-center items-center mr-2 hover:border-white hover:border-2 cursor-pointer"
            >
              <Icon icon={bell} w={20} />
            </div>
            <ProfilePhoto />
          </div>
        </div>
        <div className="h"></div>
        <div className="hidden sm:flex justify-between items-center">
          <div className=" cursor-pointer pl-2 hover:scale-125">
            <div className="h-1 bg-white w-8 m-1 rounded"></div>
            <div className="h-1 bg-white w-8 m-1 rounded"></div>
            <div className="h-1 bg-white w-8 m-1 rounded"></div>
          </div>
          <div>
            {tabs.map((tab, index) => (
              <Tabs link={tab.link} name={tab.name} key={index} />
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
