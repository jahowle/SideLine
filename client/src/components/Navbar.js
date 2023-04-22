import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import CreateWager from "./CreateWager";

function Navbar({ games, isLoaded, updateWagers }) {
  const { user, isLoggedIn, onLogout } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);

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
          <button onClick={() => setShowModal(true)} className="btn mx-4">
            Create Wager
          </button>
          <LogoutButton />
        </div>
        <CreateWager
          games={games}
          isLoaded={isLoaded}
          updateWagers={updateWagers}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      </div>
    );
  } else {
    return (
      <div className="navbar bg-primary text-primary-content mb-4 flex flex-row items-center justify-center">
        <h2 className="text-center">Sideline</h2>
      </div>
    );
  }
}

export default Navbar;
