import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

function AddFunds() {
  const { user, setUser } = useContext(UserContext);
  const [amount, setAmount] = useState(0);

  function handleAddFunds(e) {
    e.preventDefault();
    const newBalance = user.balance + amount;
    fetch(`/api/update/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ balance: newBalance }),
    })
      .then((r) => r.json())
      .then((updatedUser) => {
        console.log(updatedUser);
      });

    setUser({ ...user, balance: newBalance });
    setAmount(0);
  }

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex flex-col items-center p-4 bg-gray-700 rounded-lg shadow-lg mt-8"
        onSubmit={handleAddFunds}
      >
        <label className="mb-2" for="amount">
          Amount
        </label>
        <input
          type="number"
          className="input input-bordered input-primary w-full max-w-xs mb-4"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <button className="btn btn-primary btn-wide" type="submit">
          Add Funds
        </button>
      </form>
    </div>
  );
}

export default AddFunds;
