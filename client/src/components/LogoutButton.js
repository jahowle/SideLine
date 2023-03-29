import React, {useContext} from "react";
import { UserContext } from "../context/user";

function LogoutButton() {

    const {onLogout} = useContext(UserContext)

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogout());
      }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
    }

    export default LogoutButton;