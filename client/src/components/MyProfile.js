import React, { useContext } from "react";
import { UserContext } from "../context/user";
import WagerCard from "./WagerCard";
import { Link, useRouteMatch, Route } from "react-router-dom";
import WagersMade from "./WagersMade";
import WagersTaken from "./WagersTaken";

function MyProfile({ wagers, updateWagers, updateTaker }) {
  const { user } = useContext(UserContext);
  const match = useRouteMatch();

  return (
    <div>
      <Link to="/add-funds">
        <button className="btn btn-primary">Add Funds</button>
      </Link>
      <div className="flex flex-row">
        <Link to="/my-profile/wagers-made">
          <button className="btn">Wagers Made</button>
        </Link>
        <Link to="/my-profile/wagers-taken">
          <button className="btn">Wagers Taken</button>
        </Link>
      </div>
      <Route path="/my-profile/wagers-made">
        <WagersMade
          wagers={wagers}
          updateWagers={updateWagers}
          updateTaker={updateTaker}
        />
      </Route>
      <Route path="/my-profile/wagers-taken">
        <WagersTaken wagers={wagers} updateTaker={updateTaker} />
      </Route>
    </div>
  );
}

export default MyProfile;
