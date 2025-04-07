import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { liveMatch } from "../context/LiveMatch";
import BatterTitle from "../components/ui/BatterTitle";
import BatterPerformance from "../components/BatterPerformance";
import BowlerTitle from "../components/ui/BowlerTitle";
import BowlerPerformence from "../components/BowlerPerformence";

export default function Scorecard() {
  const { innings1, innings2, matchDetails, teamA, teamB } = liveMatch();
  console.log(innings1, teamA, teamB);
  return (
    <div className="px-2 flex flex-col ml-auto mr-auto w-fill sm:w-[70%] max-w-[800px]">
      <Accordion collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="">
            <div className="flex justify-between w-full">
              <div>{matchDetails.innings2 ? teamB?.name : teamA?.name}</div>
              <div>
                {innings1?.score}-{innings1?.wickets} (
                {innings1?.overs.length - 1}.
                {innings1?.overs.find((ov) => !ov.completed).ballCount})
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <BatterTitle />
              {innings1?.batters?.map((striker, index) => {
                console.log("hi");
                return (
                  <BatterPerformance
                    runs={striker.runs}
                    balls={striker?.balls}
                    fours={striker?.fours}
                    sixs={striker?.sixes}
                    sr={
                      striker?.balls == 0
                        ? 0
                        : ((striker?.runs * 100) / striker?.balls).toFixed(1)
                    }
                    name={striker?.name}
                    score={true}
                    key={index}
                    out={striker.out}
                  />
                );
              })}

              <div>
                total score is {innings1?.score}-{innings1?.wickets} (
                {innings1?.overs.length - 1}.
                {innings1?.overs.find((ov) => !ov.completed).ballCount})
              </div>

              <BowlerTitle />
              {innings1?.bowlers.map((bowler, index) => {
                return (
                  <BowlerPerformence
                    name={bowler?.name}
                    overs={bowler?.overs?.toFixed(1)}
                    runs={bowler?.runs}
                    wickets={bowler?.wickets}
                    madien={bowler?.madiens}
                    eco={
                      bowler?.overs != 0
                        ? (
                            (bowler?.runs * 6) /
                            (6 * Math.floor(bowler?.overs + 0.0001) +
                              ((bowler?.overs * 10).toFixed(0) % 10))
                          ).toFixed(1)
                        : 0
                    }
                  />
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover: decoration-0">
            <div className="flex justify-between w-full">
              <div>{matchDetails.innings2 ? teamA?.name : teamB?.name}</div>
              {matchDetails.innings2 ? (
                <div>
                  {innings2?.score}-{innings2?.wickets} (
                  {innings2?.overs.length - 1}.
                  {innings2?.overs.find((ov) => !ov.completed).ballCount})
                </div>
              ) : (
                <div>Not Started</div>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {matchDetails.innings2 && (
              <div>
                <BatterTitle />
                {innings2?.batters?.map((striker, index) => {
                  console.log("hi");
                  return (
                    <BatterPerformance
                      runs={striker.runs}
                      balls={striker?.balls}
                      fours={striker?.fours}
                      sixs={striker?.sixes}
                      sr={
                        striker?.balls == 0
                          ? 0
                          : ((striker?.runs * 100) / striker?.balls).toFixed(1)
                      }
                      name={striker?.name}
                      score={true}
                      key={index}
                      out={striker.out}
                    />
                  );
                })}

                <div>
                  total score is {innings2?.score}-{innings2?.wickets} (
                  {innings2?.overs.length - 1}.
                  {innings2?.overs.find((ov) => !ov.completed).ballCount})
                </div>

                <BowlerTitle />
                {innings2?.bowlers.map((bowler, index) => {
                  return (
                    <BowlerPerformence
                      name={bowler?.name}
                      overs={bowler?.overs?.toFixed(1)}
                      runs={bowler?.runs}
                      wickets={bowler?.wickets}
                      madien={bowler?.madiens}
                      eco={
                        bowler?.overs != 0
                          ? (
                              (bowler?.runs * 6) /
                              (6 * Math.floor(bowler?.overs + 0.0001) +
                                ((bowler?.overs * 10).toFixed(0) % 10))
                            ).toFixed(1)
                          : 0
                      }
                    />
                  );
                })}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
