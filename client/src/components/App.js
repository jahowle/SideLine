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
  const [isLoaded, setIsLoaded] = useState(false);
  const [games, setGames] = useState([]);
  const [openWagers, setOpenWagers] = useState([]);
  const [takenWagers, setTakenWagers] = useState([]);
  const [expiredWagers, setExpiredWagers] = useState([]);
  const [finishedWagers, setFinishedWagers] = useState([]);

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    fetch("/api/wagers").then((r) => {
      if (r.ok) {
        r.json().then((wagers) => {
          sortWagers(wagers);
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

  function sortWagers(wagers) {
    const openWagers = wagers.filter((wager) => {
      if (wager.status === "open") {
        return wager;
      } else {
        return null;
      }
    });
    const takenWagers = wagers.filter((wager) => {
      if (wager.status === "taken") {
        return wager;
      } else {
        return null;
      }
    });
    const expiredWagers = wagers.filter((wager) => {
      if (wager.status === "expired") {
        return wager;
      } else {
        return null;
      }
    });
    const finishedWagers = wagers.filter((wager) => {
      if (wager.status === "finished") {
        return wager;
      } else {
        return null;
      }
    });
    setOpenWagers(openWagers);
    setTakenWagers(takenWagers);
    setExpiredWagers(expiredWagers);
    setFinishedWagers(finishedWagers);
  }

  function updateTaker(updatedWager) {
    console.log("The updated wager", updatedWager);

    if (updatedWager.status === "taken") {
      console.log("adding a taker to the wager");
      const updatedTakenWagers = openWagers.map((wager) => {
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

      const updatedOpenWagers = openWagers.filter((wager) => {
        if (wager.id !== updatedWager.id) {
          return wager;
        } else {
          return null;
        }
      });

      setOpenWagers(updatedOpenWagers);

      setTakenWagers(updatedTakenWagers);
    } else if (updatedWager.status === "open") {
      console.log("removing a taker from the wager");
      const updatedOpenWagers = takenWagers.map((wager) => {
        if (wager.id === updatedWager.id) {
          return {
            ...wager,
            taker_id: null,
            taker: null,
            status: updatedWager.status,
          };
        } else {
          return wager;
        }
      });

      const updatedTakenWagers = takenWagers.filter((wager) => {
        if (wager.id !== updatedWager.id) {
          return wager;
        } else {
          return null;
        }
      });

      setTakenWagers(updatedTakenWagers);
      setOpenWagers(updatedOpenWagers);
    }
  }

  function updateWinner(finishedGame) {
    console.log("The finished game", finishedGame);

    // const updatedWagers = wagers.map((wager) => {
    //   if (wager.pick === winningTeam) {
    //     handleWin(wager.maker_id, wager.taker_id, wager);
    //     return {
    //       ...wager,
    //       status: "finished",
    //       winner: wager.maker_id,
    //     };
    //   } else {
    //     handleWin(wager.taker_id, wager.maker_id, wager);
    //     return {
    //       ...wager,
    //       status: "finished",
    //       winner: wager.taker_id,
    //     };
    //   }
    // });
    // setWagers(updatedWagers);
  }

  function updateWagers(newWager) {
    console.log("The new wager", newWager);
    if (newWager.status === "open") {
      setOpenWagers([...openWagers, newWager]);
    } else if (newWager.status === "taken") {
      setTakenWagers([...takenWagers, newWager]);
    } else if (newWager.status === "expired") {
      setExpiredWagers([...expiredWagers, newWager]);
    } else if (newWager.status === "finished") {
      setFinishedWagers([...finishedWagers, newWager]);
    }
  }

  function deleteWager(id, status) {
    if (status === "open") {
      const updatedWagers = openWagers.filter((wager) => wager.id !== id);
      setOpenWagers(updatedWagers);
    } else if (status === "taken") {
      const updatedWagers = takenWagers.filter((wager) => wager.id !== id);
      setTakenWagers(updatedWagers);
    } else if (status === "expired") {
      const updatedWagers = expiredWagers.filter((wager) => wager.id !== id);
      setExpiredWagers(updatedWagers);
    } else if (status === "finished") {
      const updatedWagers = finishedWagers.filter((wager) => wager.id !== id);
      setFinishedWagers(updatedWagers);
    }
  }

  if (isLoggedIn) {
    return (
      <div className="App">
        <Navbar games={games} isLoaded={isLoaded} updateWagers={updateWagers} />
        <Simulator
          isLoaded={isLoaded}
          updateWinner={updateWinner}
          games={games}
        />

        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route path="/my-profile">
            <MyProfile
              openWagers={openWagers}
              takenWagers={takenWagers}
              expiredWagers={expiredWagers}
              finishedWagers={finishedWagers}
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
                openWagers={openWagers}
                takenWagers={takenWagers}
                expiredWagers={expiredWagers}
                finishedWagers={finishedWagers}
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
