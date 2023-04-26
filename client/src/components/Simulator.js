import React, { useState, useEffect } from "react";
import SimulatedPlay from "./SimulatedPlay";

function Simulator({ plays, isLoaded, updateWinner, game }) {
  const [simulate, setSimulate] = useState(false);
  const [halt, setHalt] = useState(false);

  function handleClick() {
    setSimulate(!simulate);
  }

  function updateHalt(halt) {
    setHalt(halt);
  }

  if (!isLoaded) {
    return <h1>Loading... </h1>;
  } else {
    return (
      <div className="w-100% flex flex-col items-center bg-slate-950">
        {simulate && !halt ? (
          <div className="flex flex-row items-center py-6">
            <SimulatedPlay
              plays={plays}
              updateWinner={updateWinner}
              game={game}
              updateHalt={updateHalt}
              halt={halt}
            />
          </div>
        ) : (
          <button className="btn btn-primary my-4" onClick={handleClick}>
            Simulate Game
          </button>
        )}
      </div>
    );
  }
}

export default Simulator;
