import React from "react";

function BowlerPerformence({
  name,
  overs,
  runs,
  wickets,
  madien,
  eco,
  className,
}) {
  return (
    <div className={`flex text-slate-800 ${className} py-2`}>
      <p className="flex-3/8 px-2 py-1 font-semibold text-[#22753e]">{name}</p>
      <p className="flex-1/8 py-1 text-center">{overs}</p>
      <p className="flex-1/8 py-1 text-center">{runs}</p>
      <p className="flex-1/8 py-1 text-center">{wickets}</p>
      <p className="flex-1/8 py-1 text-center">{madien}</p>
      <p className="flex-1/8 py-1 text-center">{eco}</p>
    </div>
  );
}

export default BowlerPerformence;
