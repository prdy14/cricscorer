import React from "react";

function BatterPerformance({
  name,
  runs,
  balls,
  fours,
  sixs,
  sr,
  className,
  out,
  score,
}) {
  return (
    <div className={`flex text-slate-800 items-center ${className}`}>
      <div className="py-2 flex-3/8">
        <p className=" px-2  font-semibold text-[#22753e]">{name}</p>

        {score && (
          <p className="text-xs px-2 text-black font-light">
            {out ? "out" : "batting"}
          </p>
        )}
      </div>
      <p className="flex-1/8 py-1 text-center">{runs}</p>
      <p className="flex-1/8 py-1 text-center">{balls}</p>
      <p className="flex-1/8 py-1 text-center">{fours}</p>
      <p className="flex-1/8 py-1 text-center">{sixs}</p>
      <p className="flex-1/8 py-1 text-center">{sr}</p>
    </div>
  );
}

export default BatterPerformance;
