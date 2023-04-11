import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

function CreateWager({ games, isLoaded }) {
  const [formData, setFormData] = useState({});
  const { user } = useContext(UserContext);
  const [selectedGame, setSelectedGame] = useState({});

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
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

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Game</label>
        <select onChange={handleGameSelect}>
          <option>Select a Game</option>
          {gamesToDisplay}
        </select>

        {}

        <label>Pick</label>
        <select>
          <option>{selectedGame.home_team}</option>
          <option>{selectedGame.away_team}</option>
        </select>
        <label>Amount</label>
        <input type="number" />
        <button type="submit">Create Wager</button>
      </form>
    </div>
  );
}

export default CreateWager;
