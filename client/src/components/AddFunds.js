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
    <div>
      <h2>Add Funds</h2>
      <form onSubmit={handleAddFunds}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <button type="submit">Add Funds</button>
      </form>
    </div>
  );
}

export default AddFunds;
