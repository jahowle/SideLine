import React from "react";
import { Link, Route } from "react-router-dom";
import WagersMade from "./WagersMade";
import WagersTaken from "./WagersTaken";
import AddFunds from "./AddFunds";
import UserStats from "./UserStats";

function MyProfile({ allWagers, updateWagers, updateTaker, deleteWager }) {
  console.log("allWagers in MyProfile:", allWagers);

  return (
    <div className="mt-8 flex flex-col items-center">
      <UserStats />
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
            allWagers={allWagers}
            updateWagers={updateWagers}
            updateTaker={updateTaker}
            deleteWager={deleteWager}
          />
        </Route>
        <Route path="/my-profile/wagers-taken">
          <WagersTaken allWagers={allWagers} updateTaker={updateTaker} />
        </Route>
        <Route path="/my-profile/add-funds">
          <AddFunds />
        </Route>
      </div>
    </div>
  );
}

export default MyProfile;
