import React from 'react'

function SelectStriker() {
  return (
    <div>
      <h1>Select Striker</h1>
      <Select
        onValueChange={(value) => {
          setStriker((val) => {
            return { ...val, ...value };
          });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Striker" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {battingTeam.player
              .filter((player) => battingCompleted.indexOf(player.id) < 0)
              .map((player, index) => {
                return (
                  <SelectItem value={player} key={`${player.name}-${index}`}>
                    {player.name}
                  </SelectItem>
                );
              })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <h1>Select Non-Striker</h1>
      <Select
        onValueChange={(value) => {
          setNonStriker((val) => ({ ...val, ...value }));
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Non-Striker" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {battingTeam.player
              .filter(
                (player) =>
                  battingCompleted.indexOf(player.id) < 0 &&
                  striker?.id != player.id
              )
              .map((player, index) => {
                return (
                  <SelectItem value={player} key={`${player.name}-${index}`}>
                    {player.name}
                  </SelectItem>
                );
              })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <h1>Select Bowler</h1>
      <Select
        onValueChange={(value) => {
          setBowler({ ...bowler, ...value });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Bowler" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {bowlingTeam.player.map((player, index) => {
              return (
                <SelectItem value={player} key={`${player.name}-d${index}`}>
                  {player.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        onClick={() => {
          setBattingCompleted((prev) => [...prev, striker, nonStriker]);
          setFlag(true);
        }}
      />
    </div>
  );
}

export default SelectStriker
