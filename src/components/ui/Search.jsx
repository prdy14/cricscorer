import React, { useState } from "react";
import searchIcon from "../../assets/searchIcon.svg";
function Search(props) {
  const ref = React.useRef({});
  const [search, setSearch] = useState("");

  const handelClick = () => {
    ref.current.focus();
  };

  const handelChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div
        className={`flex bg-white rounded-sm p-2 search`}
        onClick={handelClick}
      >
        <img src={searchIcon} alt="search" width={17} />
        <input
          type="search"
          placeholder="Search..."
          ref={ref}
          style={{
            borderStyle: "none",
            all: "unset",
            padding: "0px 8px",
            width: "100%",
          }}
          className="bg-"
          onChange={handelChange}
        />
      </div>
    </>
  );
}

export default Search;
