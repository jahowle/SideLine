import React, { useContext, useState, useEffect } from "react";
import WagerCard from "./WagerCard";
import { UserContext } from "../context/user";

function WagersMade({ allWagers, updateWagers, updateTaker, deleteWager }) {
  const { user } = useContext(UserContext);

  console.log(allWagers);

  const wagersMade = allWagers.map((wager) => {
    if (wager) {
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
            game={wager.game}
            updateWagers={updateWagers}
            updateTaker={updateTaker}
            deleteWager={deleteWager}
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
      <h1>Wagers Made</h1>

      <div className="flex flex-wrap">{wagersMade}</div>
    </div>
  );
}

export default WagersMade;
