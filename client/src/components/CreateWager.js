import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";

function CreateWager({ games, isLoaded, updateWagers }) {
  const { user, setUser } = useContext(UserContext);
  const [selectedGame, setSelectedGame] = useState({});
  const [amount, setAmount] = useState(0);
  const [pick, setPick] = useState("");
  const history = useHistory();

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
    }).then((r) => {
      if (r.ok) {
        r.json().then((newWager) => {
          updateWagers(newWager);
          setUser({ ...user, balance: user.balance - amount });
          history.push("/");
        });
      } else {
        r.json().then((errorData) => console.log(errorData.errors));
      }
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
    <div className="flex flex-col items-center">
      <form
        className="flex flex-col items-center p-4 bg-gray-700 rounded-lg shadow-lg mt-8"
        onSubmit={handleSubmit}
      >
        <label className="text-m mb-2">Game</label>
        <select
          className="select select-primary w-full max-w-xs mb-4"
          onChange={handleGameSelect}
        >
          <option value="none" selected disabled hidden>
            Select A Game
          </option>
          {gamesToDisplay}
        </select>

        <label className="mb-2">Pick</label>
        <select
          className="select select-primary w-full max-w-xs mb-4"
          onChange={handlePickSelect}
        >
          <option>{selectedGame.home_team}</option>
          <option>{selectedGame.away_team}</option>
        </select>
        <label className="mb-2">Amount</label>
        <input
          type="number"
          className="input input-bordered input-primary w-full max-w-xs mb-4"
          placeholder="Enter Wager Amount"
          onChange={handleAmountChange}
        />
        <button className="btn btn-primary btn-wide" type="submit">
          Create Wager
        </button>
      </form>
    </div>
  );
}

export default CreateWager;
