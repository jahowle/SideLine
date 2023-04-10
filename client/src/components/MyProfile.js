import React, { useContext } from "react";
import { UserContext } from "../context/user";
import WagerCard from "./WagerCard";

function MyProfile({ wagers }) {
  const { user } = useContext(UserContext);

  const wagersToDisplay = wagers.map((wager) => {
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

  return (
    <div>
      <h2>My Profile</h2>
      <div>{wagersToDisplay}</div>
    </div>
  );
}

export default MyProfile;
