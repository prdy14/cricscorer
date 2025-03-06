import React from "react";
import searchIcon from "../../assets/searchIcon.svg";
import Icon from "./Icon";

function Search(props) {
  const ref = React.useRef({});

  const handelClick = () => {
    ref.current.focus();
  };
  return (
    <>
      <div
        className="flex bg-white rounded-sm p-2 search"
        onClick={handelClick}
      >
        <Icon icon={searchIcon} w={17} />
        <input
          type="text"
          placeholder="Search..."
          ref={ref}
          style={{ borderStyle: "none", all: "unset", padding: "0px 8px" }}
        />
        <div></div>
      </div>
    </>
  );
}

export default Search;
