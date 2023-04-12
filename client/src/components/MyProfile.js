import React, { useContext } from "react";
import { UserContext } from "../context/user";
import WagerCard from "./WagerCard";
import { Link } from "react-router-dom";

function MyProfile({ wagers }) {
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

  return (
    <div>
      <Link to="/add-funds">
        <button className="btn btn-primary">Add Funds</button>
      </Link>
      <h2>Wagers Made</h2>
      <div>{wagersMade}</div>
      <h2>Wagers Taken</h2>
    </div>
  );
}

export default MyProfile;
