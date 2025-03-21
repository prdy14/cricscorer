import React from "react";

function BatterPerformance({ name, runs, balls, fours, sixs, sr, className }) {
  return (
    <div className={`flex text-slate-800 ${className}`}>
      <p className="flex-3/8 px-2 py-1 font-semibold text-[#22753e]">{name}</p>
      <p className="flex-1/8 py-1 text-center">{runs}</p>
      <p className="flex-1/8 py-1 text-center">{balls}</p>
      <p className="flex-1/8 py-1 text-center">{fours}</p>
      <p className="flex-1/8 py-1 text-center">{sixs}</p>
      <p className="flex-1/8 py-1 text-center">{sr}</p>
    </div>
  );
}

export default BatterPerformance;
