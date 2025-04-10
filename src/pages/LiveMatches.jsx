import React, { useEffect, useState } from "react";
import instance from "../config/axios";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../components/ui/skeleton";

export default function LiveMatches() {
  const [matches, setMatches] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const updateMatches = async () => {
      const res = await instance.get(`/matches/allmatches/${count}`);

      setMatches(res.data);
      setLoading(false);
    };
    if (count > -1) {
      updateMatches();
    }
  }, [count]);

  return (
    <>
      <div className="lg:ml-[20%] lg:mr-[20%] grid sm:grid-cols-2 mb-4">
        {loading
          ? matches.map((match, index) => {
              return (
                <div
                  className="flex flex-col max-w-[400px] m-2 p-2 h-fit  shadow rounded-2xl"
                  key={index}
                >
                  <div className="flex flex-col justify-center items-center  ">
                    <Skeleton className="text-sm font-semibold h-3 w-30 mb-2"></Skeleton>
                    <Skeleton className="text-xs h-3 w-20 mb-1"></Skeleton>
                  </div>
                  <hr />
                  <div className="mt-1 flex  flex-col items-center">
                    <Skeleton className="text-sm font-semibold h-3  w-full mb-2"></Skeleton>

                    <Skeleton className="text-sm font-semibold h-3 w-full mb-2"></Skeleton>

                    <Skeleton className="text-sm font-semibold h-3 w-[50%] mb-2"></Skeleton>
                  </div>
                </div>
              );
            })
          : matches.map((match, index) => {
              return (
                <div
                  key={"live M - " + index}
                  className="flex flex-col max-w-[400px] m-2 p-2 h-fit bg-[#426f5111] shadow rounded-2xl"
                  onClick={() => {
                    navigate(`/livematch/${match.id}/live`);
                  }}
                >
                  <div className="flex flex-col justify-center items-center">
                    <div className="text-sm font-semibold">{`${match.teamA} Vs ${match.teamB}`}</div>
                    <div className="text-xs">{match.venue}</div>
                  </div>
                  <hr />
                  <div>
                    <div className="flex justify-between px-2">
                      <div>{match.teamA}</div>
                      <div>{match.score1}</div>
                    </div>
                    <div className="flex justify-between px-2">
                      <div>{match.teamB}</div>
                      <div>
                        {!match.secondInnings ? "not started" : match.score2}
                      </div>
                    </div>
                  </div>
                  <div>
                    {!match.secondInnings
                      ? `Toss won by ${match.tossWon} and elect to ${match.optTo}`
                      : `target for ${match.teamB} is ${match.target}`}
                  </div>
                </div>
              );
            })}
      </div>
      <footer className=" w-full p-2">
        <div className="flex justify-center items-center">
          <p>More Matches</p>
          <Button
            className="mx-5 bg-[#426f51] hover:text-[#426f51] hover:bg-white hover:border-[#426f51] border-2 border-[#426f51] cursor-pointer"
            onClick={() => {
              setCount((prev) => {
                if (count > 0) {
                  return prev - 1;
                }
                return 0;
              });
            }}
          >
            Previous page
          </Button>
          <Button
            className="bg-[#426f51] hover:text-[#426f51] hover:bg-white hover:border-[#426f51] border-2 border-[#426f51] cursor-pointer"
            onClick={() => {
              setCount((prev) => {
                if (matches.length != 0) {
                  return prev + 1;
                }
                return prev;
              });
            }}
          >
            next page
          </Button>
        </div>
      </footer>
    </>
  );
}
