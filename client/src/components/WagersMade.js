import React, { useContext } from "react";
import WagerCard from "./WagerCard";
import { UserContext } from "../context/user";

function WagersMade({ wagers }) {
  const { user } = useContext(UserContext);

  const wagersMade = wagers.map((wager) => {
    if (wager.maker_id === user.id) {
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
        />
      );
    } else {
      return null;
    }
  });
  return <div>{wagersMade}</div>;
}

export default WagersMade;
