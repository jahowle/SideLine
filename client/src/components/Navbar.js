import React, {useContext} from "react";
import { UserContext } from "../context/user";
import LogoutButton from "./LogoutButton";


function Navbar() {

    const {user, isLoggedIn, onLogout} = useContext(UserContext)

    console.log(user)

    if (isLoggedIn) {
        return (
            <div id="navbar">
            <h2>Welcome, {user.username}</h2>
            <LogoutButton />
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