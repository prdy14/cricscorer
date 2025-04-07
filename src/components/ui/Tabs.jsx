import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./button";

function Tabs(props) {
  return (
    <>
      <Button className="bg- text-md text-gray-200 hover:bg-white hover:text-[#083f27] hover:shadow-2xl my-1 shadow-none">
        <Link to={props.link}>{props.name}</Link>
      </Button>
    </>
  );
}

export default Tabs;
