import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

function WagerCard({
  amount,
  pick,
  homeTeam,
  awayTeam,
  status,
  maker,
  taker,
  updateTaker,
  id,
}) {
  const { user } = useContext(UserContext);

  function handleClick() {
    fetch(`/api/wagers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taker_id: user.id, status: "taken" }),
    })
      .then((r) => r.json())
      .then((updatedWager) => {
        console.log(updatedWager);
        updateTaker(updatedWager.id);
      });
  }

  return (
    <div className="box-border h-64 w-64 p-4 bg-slate-100 border-white border-2 ">
      <h2>Maker: {maker.username}</h2>
      <h2>Taker: {taker ? taker.username : "none"}</h2>
      <h2>Status: {status}</h2>
      <div className="flex">
        <h3>
          {homeTeam} vs {awayTeam}
        </h3>
      </div>
      <div className="flex">
        {pick === homeTeam ? (
          <h4>
            Take {awayTeam} for ${amount}
          </h4>
        ) : (
          <h4>
            Take {homeTeam} for ${amount}
          </h4>
        )}
      </div>
      <button onClick={handleClick} className="border-2 border-black">
        <h4 className="text-black">Take Bet</h4>
      </button>
    </div>
  );
}

export default WagerCard;
