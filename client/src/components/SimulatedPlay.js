import React, { useState, useEffect } from "react";

function SimulatedPlay({ plays, updateWinner, game, updateHalt, halt }) {
  const [play, setPlay] = useState({});
  const [i, setI] = useState(0);
  const [gameState, setGameState] = useState("pre-game");

  useEffect(() => {
    if (gameState === "F" && !halt) {
      getWinner();
    } else {
      const interval = setInterval(() => {
        setPlay(plays[i]);
        setI(i + 1);
        setGameState(play.quarter);
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  function getWinner() {
    if (play.away_score > play.home_score) {
      updateWinner(game.away_team);
    } else if (play.away_score < play.home_score) {
      updateWinner(game.home_team);
    } else {
      updateWinner("tie");
    }
    updateHalt(true);
  }

  return (
    <div>
      <h1>
        SF - {play.away_score} vs PHI - {play.home_score}
      </h1>
      <h1>Quarter: {gameState}</h1>
    </div>
  );
}

export default SimulatedPlay;
