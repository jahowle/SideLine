import React from "react";
import WagerCard from "./WagerCard";

function Home({
  openWagers,
  takenWagers,
  expiredWagers,
  finishedWagers,
  updateTaker,
  updateWagers,
  deleteWager,
}) {
  const openWagerCards = openWagers.map((wager) => {
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
        updateTaker={updateTaker}
        game={wager.game}
        updateWagers={updateWagers}
        deleteWager={deleteWager}
        winner={wager.winner}
      />
    );
  });

  const takenWagerCards = takenWagers.map((wager) => {
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
        updateTaker={updateTaker}
        game={wager.game}
        updateWagers={updateWagers}
        deleteWager={deleteWager}
        winner={wager.winner}
      />
    );
  });

  const expiredWagerCards = expiredWagers.map((wager) => {
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
        updateTaker={updateTaker}
        game={wager.game}
        updateWagers={updateWagers}
        deleteWager={deleteWager}
        winner={wager.winner}
      />
    );
  });

  const finishedWagerCards = finishedWagers.map((wager) => {
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
        updateTaker={updateTaker}
        game={wager.game}
        updateWagers={updateWagers}
        deleteWager={deleteWager}
        winner={wager.winner}
      />
    );
  });

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl mb-4 mt-4">Open Wagers</h2>
      <div className="flex flex-row flex-wrap w-3/4">{openWagerCards}</div>
      <h2 className="text-4xl mb-4 mt-4">Taken Wagers</h2>
      <div className="flex flex-row flex-wrap w-3/4">{takenWagerCards}</div>
      <h2 className="text-4xl mb-4 mt-4">Expired Wagers</h2>
      <div className="flex flex-row flex-wrap w-3/4">{expiredWagerCards}</div>
      <h2 className="text-4xl mb-4 mt-4">Finished Wagers</h2>
      <div className="flex flex-row flex-wrap w-3/4">{finishedWagerCards}</div>
    </div>
  );
}

export default Home;
