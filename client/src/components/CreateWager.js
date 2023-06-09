import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import ReactDom from "react-dom";

function CreateWager({
  games,
  isLoaded,
  updateWagers,
  setShowModal,
  showModal,
}) {
  const { user, setUser } = useContext(UserContext);
  const [selectedGame, setSelectedGame] = useState({});
  const [amount, setAmount] = useState(0);
  const [pick, setPick] = useState("");
  const [errors, setErrors] = useState([]);
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
          setShowModal(false);
        });
      } else {
        r.json().then((errorData) => setErrors(errorData.errors));
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
  if (!showModal) return null;

  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/75 z-50" />
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
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
            <option value="none" selected disabled hidden></option>
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
          <button
            className="btn btn-outline btn-wide mt-4"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          {errors.length > 0 && (
            <p style={{ color: "red" }}>
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </p>
          )}
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default CreateWager;
