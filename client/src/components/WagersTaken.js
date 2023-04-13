import React, { useContext } from "react";
import { UserContext } from "../context/user";
import WagerCard from "./WagerCard";

function WagersTaken({ wagers }) {
  const { user } = useContext(UserContext);
  const wagersTaken = wagers.map((wager) => {
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
        />
      );
    } else {
      return null;
    }
  });
  return <div className="flex flex-row flex-wrap w-3/4">{wagersTaken}</div>;
}

export default WagersTaken;