import React, { useContext } from "react";
import { UserContext } from "../context/user";

function UserStats() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex flex-row items-center">
      <h1 className="p-8">Wins: {user.wins}</h1>
      <h1 className="p-8">Losses: {user.losses}</h1>
    </div>
  );
}

export default UserStats;
