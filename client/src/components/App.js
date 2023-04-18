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
import Simulator from "./Simulator";

function App() {
  const [wagers, setWagers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [games, setGames] = useState([]);
  const [plays, setPlays] = useState([]);

  const { isLoggedIn, user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("/api/wagers").then((r) => {
      if (r.ok) {
        r.json().then((wagers) => {
          setWagers(wagers);
          console.log(wagers);
        });
      } else {
        console.log("error getting wagers");
      }
    });
    fetch("/api/games").then((r) => {
      if (r.ok) {
        r.json().then((games) => {
          setGames(games);
          setPlays(games[0].plays);
          console.log("the plays", games[0].plays);
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

  function handleWin(winnerId, wagerId) {
    console.log("The winner id", winnerId);
    console.log("The wager id", wagerId);
    console.log(wagers);
    fetch(`/api/settle_wager/${wagerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ winner: winnerId, status: "finished" }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedWager) => {
          console.log(updatedWager);
        });
      } else {
        r.json().then((errorData) => console.log(errorData.errors));
      }
    });
  }

  function updateWinner(winningTeam) {
    debugger;
    const updatedWagers = wagers.map((wager) => {
      if (wager.pick === winningTeam) {
        handleWin(wager.maker_id, wager.id);
        return {
          ...wager,
          status: "finished",
          winner: wager.maker_id,
        };
      } else {
        handleWin(wager.taker_id, wager.id);
        return {
          ...wager,
          status: "finished",
          winner: wager.taker_id,
        };
      }
    });
    setWagers(updatedWagers);
  }

  function updateWagers(newWager) {
    console.log("The new wager", newWager);
    setWagers([...wagers, newWager]);
  }

  function deleteWager(id) {
    const updatedWagers = wagers.filter((wager) => wager.id !== id);
    setWagers(updatedWagers);
  }

  if (isLoggedIn) {
    return (
      <div className="App">
        <Navbar />
        <Simulator
          plays={plays}
          isLoaded={isLoaded}
          updateWinner={updateWinner}
          game={games[0]}
        />

        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route path="/my-profile">
            <MyProfile
              wagers={wagers}
              deleteWager={deleteWager}
              updateWagers={updateWagers}
              updateTaker={updateTaker}
            />
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
              <Home
                wagers={wagers}
                updateTaker={updateTaker}
                deleteWager={deleteWager}
                updateWagers={updateWagers}
              />
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
