import React from "react";

function Ball({ value, runs }) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className={`flex justify-center items-center h-10 min-w-10 w-10 m-1 rounded-full  mx-1 bg-[#426f511c] text-xs ${value}`}
        >
          {value == "out" ? (
            <p>W</p>
          ) : (
            <p>{`${
              value == "wd" || value == "nb" || value == "lb" ? value + "+" : ""
            }${runs} `}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Ball;
