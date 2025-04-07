import React from "react";
import { liveMatch } from "../context/LiveMatch";
import Ball from "../components/Ball";

function Overs() {
  const { innings1, innings2 } = liveMatch();

  return (
    <div>
      <div>
        1<sup>st</sup> innings
      </div>
      <div>
        {innings1?.overs.map((over, index) => {
          return (
            <div className="flex  items-center" key={over.id}>
              <div>{index + 1}</div>
              <div className="flex justify-center items-center">
                {over.balls.map((ball, index) => {
                  return (
                    <Ball
                      key={`ball-${over.id + index}`}
                      value={ball.type}
                      runs={ball.runs}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        2<sup>nd</sup> innings
      </div>
      <div>
        {innings2?.overs.map((over, index) => {
          return (
            <div className="flex  items-center" key={over.id}>
              <div>{index + 1}</div>
              <div className="flex justify-center items-center">
                {over.balls.map((ball, index) => {
                  return (
                    <Ball
                      key={`ball-${over.id + index}`}
                      value={ball.type}
                      runs={ball.runs}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Overs;
