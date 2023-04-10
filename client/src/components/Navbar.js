import React, { useContext } from "react";
import { UserContext } from "../context/user";
import LogoutButton from "./LogoutButton";

function Navbar() {
  const { user, isLoggedIn, onLogout } = useContext(UserContext);

  if (isLoggedIn) {
    return (
      <div
        id="navbar"
        className="h-12 bg-amber-300 flex flex-row items-center justify-center"
      >
        <div className="flex flex-row items-center w-3/4 bg-slate-50">
          <h2 className="mr-4 text-xl">Welcome, {user.username}</h2>
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
