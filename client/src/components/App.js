import "../App.css";
import React, { useContext, useState, useEffect } from "react";
import Signup from "./Signup";
import Navbar from "./Navbar";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "../context/user";
import Home from "./Home";
import Login from "./Login";
import MyProfile from "./MyProfile";
import CreateWager from "./CreateWager";
import AddFunds from "./AddFunds";

function App() {
  const [wagers, setWagers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [games, setGames] = useState([]);

  const { isLoggedIn, user } = useContext(UserContext);

  useEffect(() => {
    fetch("/api/wagers").then((r) => {
      if (r.ok) {
        r.json().then((wagers) => {
          setWagers(wagers);
        });
      } else {
        console.log("error getting wagers");
      }
    });
    fetch("/api/games").then((r) => {
      if (r.ok) {
        r.json().then((games) => {
          setGames(games);
          setIsLoaded(true);
        });
      } else {
        console.log("error getting games");
      }
    });
  }, []);

  function updateTaker(wagerId) {
    console.log(wagerId);
    const updatedWagers = wagers.map((wager) => {
      if (wager.id === wagerId) {
        return { ...wager, taker_id: user.id, taker: user, status: "taken" };
      } else {
        return wager;
      }
    });
    setWagers(updatedWagers);
  }

  if (isLoggedIn) {
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/my-profile">
            <MyProfile wagers={wagers} />
          </Route>

          <Route exact path="/add-funds">
            <AddFunds />
          </Route>

          <Route exact path="/create-wager">
            <CreateWager games={games} isLoaded={isLoaded} />
          </Route>

          <Route exact path="/">
            {isLoaded ? (
              <Home wagers={wagers} updateTaker={updateTaker} />
            ) : (
              <h2>Loading...</h2>
            )}
          </Route>
        </Switch>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/">
          <Signup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
