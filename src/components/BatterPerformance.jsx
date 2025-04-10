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
  bowledBy,
}) {
  return (
    <div className={`flex text-slate-800 items-center ${className}`}>
      <div className="py-2 flex-3/8">
        <p className=" px-2  font-semibold text-[#22753e]">{name}</p>

        {score && (
          <div className="text-xs px-2 text-black ">
            {out ? (
              <p>
                <span className="font-semibold">b </span>
                {bowledBy}
              </p>
            ) : (
              "batting"
            )}
          </div>
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
