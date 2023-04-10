import React from "react";
import WagerCard from "./WagerCard";

function Home({ wagers }) {
  console.log(wagers);

  const wagerCards = wagers.map((wager) => {
    return (
      <WagerCard
        key={wager.id}
        amount={wager.amount}
        pick={wager.pick}
        homeTeam={wager.game.home_team}
        awayTeam={wager.game.away_team}
        status={wager.status}
        maker={wager.maker}
      />
    );
  });

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl mb-4 mt-4">Wagers</h2>
      <div className="flex flex-row flex-wrap w-3/4">{wagerCards}</div>
    </div>
  );
}

export default Home;
