import React, { useState, useContext, useEffect } from "react";
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
  deleteWager,
  game,
  winner,
}) {
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [winnerName, setWinnerName] = useState("");

  useEffect(() => {
    if (winner) {
      if (winner === maker.id) {
        setWinnerName(maker.username);
      } else {
        setWinnerName(taker.username);
      }
    }
  }, [winner]);

  function handleClick() {
    fetch(`/api/wagers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taker_id: user.id, status: "taken" }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedWager) => {
          updateTaker(updatedWager);
          setUser({ ...user, balance: user.balance - updatedWager.amount });
        });
      } else {
        r.json().then((errorData) => console.log(errorData.errors));
      }
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
      deleteWager(id);
    }
  }

  function CancelButton() {
    if ((taker && taker.id === user.id) || maker.id === user.id) {
      return (
        <button onClick={handleCancel} className="btn btn-ghost text-red-700">
          Cancel Wager
        </button>
      );
    }
  }

  return (
    <div className="box-border h-64 w-64 p-4 bg-slate-100 m-4 rounded-md flex flex-col">
      <div className="grow">
        <div className="flex text-xl font-bold text-slate-700">
          <h3>
            {homeTeam} vs {awayTeam}
          </h3>
        </div>
        <h2 className="text-slate-600">Maker: {maker.username}</h2>
        <h2 className="text-slate-600">
          Taker: {taker ? taker.username : "none"}
        </h2>
        <h2 className="text-slate-600">
          {status === "finished" ? (
            <h2>Winner: {winnerName} </h2>
          ) : (
            <h2> Status: {status} </h2>
          )}
        </h2>
      </div>
      <div className="justify-end">
        {taker ? null : (
          <button onClick={handleClick} className="btn">
            <h4 className="text-white">
              {pick === homeTeam ? (
                <h4>
                  Take {awayTeam} for ${amount}
                </h4>
              ) : (
                <h4>
                  Take {homeTeam} for ${amount}
                </h4>
              )}
            </h4>
          </button>
        )}
        {CancelButton()}
      </div>
    </div>
  );
}

export default WagerCard;
