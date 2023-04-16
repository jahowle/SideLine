import React, { useContext } from "react";
import { UserContext } from "../context/user";
import WagerCard from "./WagerCard";
import { Link, useRouteMatch, Route } from "react-router-dom";
import WagersMade from "./WagersMade";
import WagersTaken from "./WagersTaken";
import AddFunds from "./AddFunds";

function MyProfile({ wagers, updateWagers, updateTaker, deleteWager }) {
  const { user } = useContext(UserContext);
  const match = useRouteMatch();

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="flex flex-row">
        <Link to="/my-profile/add-funds">
          <button className="btn btn-primary mr-4">Add Funds</button>
        </Link>
        <div className="flex flex-row">
          <Link to="/my-profile/wagers-made">
            <button className="btn mr-4">Wagers Made</button>
          </Link>
          <Link to="/my-profile/wagers-taken">
            <button className="btn">Wagers Taken</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Route path="/my-profile/wagers-made">
          <WagersMade
            wagers={wagers}
            updateWagers={updateWagers}
            updateTaker={updateTaker}
            deleteWager={deleteWager}
          />
        </Route>
        <Route path="/my-profile/wagers-taken">
          <WagersTaken wagers={wagers} updateTaker={updateTaker} />
        </Route>
        <Route path="/my-profile/add-funds">
          <AddFunds />
        </Route>
      </div>
    </div>
  );
}

export default MyProfile;
