import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

function Simulator({
  isLoaded,
  openWagers,
  takenWagers,
  games,
  addToFinishedWagers,
  addToExpiredWagers,
}) {
  const [simulate, setSimulate] = useState(false);

  const { user, setUser } = useContext(UserContext);

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
        sortUpdatedWagers(wagers);
      });
  }

  function sortUpdatedWagers(wagers) {
    wagers.forEach((wager) => {
      if (wager.status === "expired") {
        if (wager.maker_id === user.id) {
          setUser({
            ...user,
            balance: user.balance + wager.amount,
          });
        }
        addToExpiredWagers(wager);
      } else if (wager.status === "finished") {
        if (wager.winner === user.id) {
          setUser({
            ...user,
            balance: user.balance + wager.amount * 2,
            wins: user.wins + 1,
          });
          console.log("You won");
        } else {
          setUser({
            ...user,
            losses: user.losses + 1,
          });
        }

        addToFinishedWagers(wager);
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
