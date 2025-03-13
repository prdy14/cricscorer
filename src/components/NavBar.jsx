import React, { useState } from "react";
import logo from "../assets/logo1.png";
import Search from "./ui/Search";
import Tabs from "./ui/Tabs";
import bell from "../assets/bell-regular.svg";
import ProfilePhoto from "./ui/ProfilePhoto";
import searchIcon from "../assets/searchIcon1.svg";
import X from "../assets/X.svg";

function NavBar() {
  const tabs = [
    { name: "LIVE SCORES", link: "/livematches" },
    { name: "START MATCH", link: "/startmatch" },
    { name: "CRICKET TIPS", link: "/crickettipd" },
    { name: "ABOUT US", link: "/aboutus" },
  ];

  const [searchOpen, setSearchOpen] = useState(false);

  const onSearchIconClick = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <>
      <div className="c w-full z-10">
        <div className="p-2 flex justify-between items-center">
          <div className="my-1 flex items-center">
            <div className=" cursor-pointer p-2 mr-2 lg:hidden">
              <div className="h-1 bg-white w-7 m-1 rounded"></div>
              <div className="h-1 bg-white w-7 m-1 rounded"></div>
              <div className="h-1 bg-white w-7 m-1 rounded"></div>
            </div>
            <img src={logo} alt="search" width={100} />
          </div>
          <div className="hidden lg:block">
            {
              <div>
                {tabs.map((tab, index) => (
                  <Tabs link={tab.link} name={tab.name} key={index} />
                ))}
              </div>
            }
          </div>
          <div className="flex">
            <div className="rounded-full flex justify-center items-center mr-2 cursor-pointer">
              {searchOpen && <Search />}
              {!searchOpen ? (
                <img
                  src={searchIcon}
                  alt="search"
                  width={20}
                  onClick={onSearchIconClick}
                />
              ) : (
                <img
                  src={X}
                  alt="close"
                  width={20}
                  onClick={onSearchIconClick}
                  className="pl-2"
                />
              )}
            </div>
            <div
              className="h-10 w-10 rounded-full sm:flex hidden
            justify-center items-center mr-2 hover:border-white hover:border-2 cursor-pointer"
            >
              <img src={bell} alt="search" width={20} />
            </div>
            <ProfilePhoto className="sm:flex" />
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
