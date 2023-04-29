import React, { useState, useEffect } from "react";

function Simulator({
  isLoaded,
  openWagers,
  takenWagers,
  games,
  addToFinishedWagers,
  addToExpiredWagers,
}) {
  const [simulate, setSimulate] = useState(false);

  function handleClick() {
    setSimulate(!simulate);
  }

  function handleSimulateAlt() {
    const wagersToSettle = openWagers.concat(takenWagers);

    fetch("/api/settle_wagers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wagersToSettle }),
    })
      .then((r) => r.json())
      .then((wagers) => {
        console.log(wagers);
      });
  }

  function handleSimulate() {
    const wagersToSettle = openWagers.concat(takenWagers);
    wagersToSettle.forEach((wager) => {
      if (wager.status === "open") {
        fetch(`/api/settle_wager/${wager.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ array: "expired" }),
        })
          .then((r) => r.json())
          .then((updatedWager) => {
            addToExpiredWagers(updatedWager);
          });
      } else if (wager.status === "taken") {
        fetch(`/api/settle_wager/${wager.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "finished" }),
        })
          .then((r) => r.json())
          .then((updatedWager) => {
            addToFinishedWagers(updatedWager);
          });
      }
    });
  }

  if (!isLoaded) {
    return <h1>Loading... </h1>;
  } else {
    return (
      <div className="w-100% flex flex-col items-center bg-slate-950">
        {simulate ? (
          <div className="flex flex-row items-center py-6">
            <h1>Simulating</h1>
            <button className="btn btn-primary my-4" onClick={handleClick}>
              Reset
            </button>
          </div>
        ) : (
          <button className="btn btn-primary my-4" onClick={handleSimulateAlt}>
            Simulate Games
          </button>
        )}
      </div>
    );
  }
}

export default Simulator;
