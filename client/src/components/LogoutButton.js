import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";

function LogoutButton() {
  const { onLogout } = useContext(UserContext);
  const history = useHistory();

  function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
    }).then(() => onLogout());
    history.push("/");
  }

  return (
    <button className="btn mx-4" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
