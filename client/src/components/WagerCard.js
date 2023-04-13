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
  updateWagers,
  id,
  game,
}) {
  const { user, setUser } = useContext(UserContext);

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
        updateTaker(updatedWager);
        setUser({ ...user, balance: user.balance - updatedWager.amount });
      });
  }

  function handleCancel() {
    if (taker && taker.id === user.id) {
      fetch(`/api/cancel_take_wager/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taker: null }),
      })
        .then((r) => r.json())
        .then((updatedWager) => {
          updateTaker(updatedWager);
          setUser({ ...user, balance: user.balance + updatedWager.amount });
        });
    } else if (maker.id === user.id) {
      fetch(`/api/wagers/${id}`, {
        method: "DELETE",
      });
      setUser({ ...user, balance: user.balance + amount });
      updateWagers(id);
    }
  }

  function CancelButton() {
    if ((taker && taker.id === user.id) || maker.id === user.id) {
      return (
        <button onClick={handleCancel} className="btn">
          Cancel Wager
        </button>
      );
    }
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
      {taker ? null : (
        <button onClick={handleClick} className="btn">
          <h4 className="text-white">Take Bet</h4>
        </button>
      )}
      {CancelButton()}
    </div>
  );
}

export default WagerCard;
