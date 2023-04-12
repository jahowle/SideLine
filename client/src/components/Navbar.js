import React, { useContext } from "react";
import { UserContext } from "../context/user";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, isLoggedIn, onLogout } = useContext(UserContext);

  if (isLoggedIn) {
    return (
      <div className="navbar bg-primary text-primary-content">
        <div>
          <h2 className="mr-4 text-xl">Welcome, {user.username}</h2>
          <h2>Balance: ${user.balance ? user.balance : "0.00"}</h2>
          <Link to="/">
            <button className="btn mx-4">Home</button>
          </Link>
          <Link to="/my-profile">
            <button className="btn mx-4">My Pofile</button>
          </Link>
          <Link to="/create-wager">
            <button className="btn mx-4">Create Wager</button>
          </Link>
          <LogoutButton />
        </div>
      </div>
    );
  } else {
    return (
      <div id="navbar">
        <h2>Welcome, Guest</h2>
      </div>
    );
  }
}

export default Navbar;
