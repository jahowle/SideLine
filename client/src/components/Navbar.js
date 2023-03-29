import React, {useContext} from "react";
import { UserContext } from "../context/user";


function Navbar() {

    const {user, isLoggedIn, onLogout} = useContext(UserContext)

    console.log(user)


    return (
        <div>
        <h1>Navbar</h1>
        <h2>{user.username}</h2>
        </div>
    );
    }

export default Navbar;