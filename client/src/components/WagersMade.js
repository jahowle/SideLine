import React, { useContext } from "react";
import WagerCard from "./WagerCard";
import { UserContext } from "../context/user";

function WagersMade({
  openWagers,
  takenWagers,
  expiredWagers,
  finishedWagers,
  updateWagers,
  updateTaker,
  deleteWager,
}) {
  const { user } = useContext(UserContext);

  const wagers = [
    ...openWagers,
    ...takenWagers,
    ...expiredWagers,
    ...finishedWagers,
  ];

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
  });
  return <div className="flex">{wagersMade}</div>;
}

export default WagersMade;
