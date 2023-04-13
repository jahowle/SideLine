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

  function updateTaker(updatedWager) {
    console.log("The updated wager", updatedWager);
    const updatedWagers = wagers.map((wager) => {
      if (wager.id === updatedWager.id) {
        return {
          ...wager,
          taker_id: updatedWager.taker_id,
          taker: updatedWager.taker,
          status: updatedWager.status,
        };
      } else {
        return wager;
      }
    });
    setWagers(updatedWagers);
  }

  function updateWagers(newWager) {
    setWagers([...wagers, newWager]);
  }

  if (isLoggedIn) {
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route path="/my-profile">
            <MyProfile wagers={wagers} />
          </Route>

          <Route exact path="/add-funds">
            <AddFunds />
          </Route>

          <Route exact path="/create-wager">
            <CreateWager
              games={games}
              isLoaded={isLoaded}
              updateWagers={updateWagers}
            />
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
