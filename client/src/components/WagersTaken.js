import React, { useContext } from "react";
import { UserContext } from "../context/user";
import WagerCard from "./WagerCard";

function WagersTaken({ allWagers, updateWagers, updateTaker }) {
  const { user } = useContext(UserContext);

  const wagersTaken = allWagers.map((wager) => {
    if (wager) {
      if (wager.taker_id === user.id) {
        return (
          <WagerCard
            key={wager.id}
            id={wager.id}
            amount={wager.amount}
            pick={wager.pick}
            homeTeam={wager.game.home_team}
            awayTeam={wager.game.away_team}
            status={wager.status}
            maker={wager.maker}
            taker={wager.taker}
            game={wager.game}
            updateWagers={updateWagers}
            updateTaker={updateTaker}
            winner={wager.winner}
          />
        );
      } else {
        return null;
      }
    }
  });
  return (
    <div className="flex flex-col items-center mt-8">
      <h1>Wagers Taken</h1>
      <div className="flex flex-row flex-wrap w-9/12">{wagersTaken}</div>
    </div>
  );
}

export default WagersTaken;
