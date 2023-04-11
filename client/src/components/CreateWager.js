import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

function CreateWager({ games, isLoaded }) {
  const { user } = useContext(UserContext);
  const [selectedGame, setSelectedGame] = useState({});
  const [amount, setAmount] = useState(0);
  const [pick, setPick] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/wagers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        pick,
        maker_id: user.id,
        game_id: selectedGame.id,
      }),
    })
      .then((r) => r.json())
      .then((newWager) => {
        console.log(newWager);
      });
  }

  const gamesToDisplay = games.map((game) => {
    return (
      <option key={game.id} value={game.id}>
        {game.home_team} vs {game.away_team}
      </option>
    );
  });

  function handleGameSelect(e) {
    const selectedGameId = parseInt(e.target.value);
    const selectedGame = games.find((game) => game.id === selectedGameId);
    setSelectedGame(selectedGame);
  }

  function handlePickSelect(e) {
    setPick(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(parseInt(e.target.value));
  }

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Game</label>
        <select onChange={handleGameSelect}>
          <option value="none" selected disabled hidden>
            Select A Game
          </option>
          {gamesToDisplay}
        </select>

        {}

        <label>Pick</label>
        <select onChange={handlePickSelect}>
          <option>{selectedGame.home_team}</option>
          <option>{selectedGame.away_team}</option>
        </select>
        <label>Amount</label>
        <input type="number" onChange={handleAmountChange} />
        <button type="submit">Create Wager</button>
      </form>
    </div>
  );
}

export default CreateWager;
