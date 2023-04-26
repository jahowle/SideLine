import React, { useState, useEffect } from "react";

function SimulatedPlay({ plays, updateWinner, games, updateHalt, halt }) {
  const [play, setPlay] = useState({});
  const [i, setI] = useState(0);
  const [gameState, setGameState] = useState("pre-game");

  const gamesToDisplay = games.map((game) => {
    return (
      <div id={game.id} className="p-2 bg-violet-900 rounded m-2">
        <h1>
          {game.away_team} {game.away_score} - {game.home_team}{" "}
          {game.home_score}
        </h1>
      </div>
    );
  });

  return <div className="flex flex-row">{gamesToDisplay}</div>;
}

export default SimulatedPlay;
