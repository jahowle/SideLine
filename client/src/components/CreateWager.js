import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

function CreateWager() {
  const [formData, setFormData] = useState({});
  const { user } = useContext(UserContext);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Game</label>
        <select>
          <option value="1">SF vs PHI</option>
        </select>

        <label>Pick</label>
        <select>
          <option value="1">SF</option>
          <option value="2">PHI</option>
        </select>
        <label>Amount</label>
        <input type="number" />
        <button type="submit">Create Wager</button>
      </form>
    </div>
  );
}

export default CreateWager;
