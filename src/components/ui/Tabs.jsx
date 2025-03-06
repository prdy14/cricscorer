import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./button";

function Tabs(props) {
  return (
    <>
      <Button className="bg-transparent mr-2 text-md text-gray-300 hover:text-gray-200 hover:bg-green-900 hover:shadow-2xl my-2">
        <Link to={props.link}>{props.name}</Link>
      </Button>
    </>
  );
}

export default Tabs;
