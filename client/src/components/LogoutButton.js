import React, { useContext } from "react";
import { UserContext } from "../context/user";

function LogoutButton() {
  const { onLogout } = useContext(UserContext);

  function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <button className="btn mx-4" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
