import React from "react";
import logo from "../assets/logo1.png";
import Search from "./ui/Search";
import Tabs from "./ui/Tabs";
import bell from "../assets/bell-regular.svg";
import Icon from "./ui/Icon";
import ProfilePhoto from "./ui/ProfilePhoto";

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
          <div className="flex ">
            <div
              className="h-10 w-10 rounded-full flex
            justify-center items-center mr-2 hover:border-white hover:border-2"
            >
              <Icon icon={bell} w={20} />
            </div>
            <ProfilePhoto />
          </div>
        </div>
        <div className="h"></div>
        <div className="hidden sm:block">
          {tabs.map((tab, index) => (
            <Tabs link={tab.link} name={tab.name} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default NavBar;
