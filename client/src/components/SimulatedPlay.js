import React, { useState, useEffect } from "react";

function SimulatedPlay({ plays, updateWinner, games, updateHalt, halt }) {
  const [play, setPlay] = useState({});
  const [i, setI] = useState(0);
  const [gameState, setGameState] = useState("pre-game");

  useEffect(() => {
    games.forEach((game) => {
      fetch(`/api/games/${game.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_over: true }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((updatedGame) => {
            updateWinner(updatedGame);
          });
        } else {
          r.json().then((errorData) => console.log(errorData.errors));
        }
      });
    });
  }, []);

  const gamesToDisplay = games.map((game) => {
    return (
      <div id={game.id} className="p-2 bg-violet-900 rounded m-2">
        <h1>
          {game.away_team} vs {game.home_team}
        </h1>
      </div>
    );
  });

  return <div className="flex flex-row">{gamesToDisplay}</div>;
}

export default SimulatedPlay;
