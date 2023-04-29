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

  const { isLoggedIn, setUser } = useContext(UserContext);

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

  function addTaker(updatedWager) {
    setTakenWagers([...takenWagers, updatedWager]);
    const updatedOpenWagers = openWagers.filter(
      (wager) => wager.id !== updatedWager.id
    );
    setOpenWagers(updatedOpenWagers);
  }

  function removeTaker(updatedWager) {
    setOpenWagers([...openWagers, updatedWager]);
    const updatedTakenWagers = takenWagers.filter(
      (wager) => wager.id !== updatedWager.id
    );
    setTakenWagers(updatedTakenWagers);
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

  function addToFinishedWagers(wager) {
    setFinishedWagers([...finishedWagers, wager]);

    const updatedTakenWagers = takenWagers.filter((wager) => {
      if (wager.id !== wager.id) {
        return wager;
      } else {
        return null;
      }
    });

    setTakenWagers(updatedTakenWagers);
  }

  function addToExpiredWagers(wager) {
    setExpiredWagers([...expiredWagers, wager]);

    const updatedOpenWagers = openWagers.filter((wager) => {
      if (wager.id !== wager.id) {
        return wager;
      } else {
        return null;
      }
    });

    setOpenWagers(updatedOpenWagers);
  }

  if (isLoggedIn) {
    return (
      <div className="App">
        <Navbar games={games} isLoaded={isLoaded} updateWagers={updateWagers} />
        <Simulator
          isLoaded={isLoaded}
          openWagers={openWagers}
          takenWagers={takenWagers}
          addToFinishedWagers={addToFinishedWagers}
          addToExpiredWagers={addToExpiredWagers}
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
                deleteWager={deleteWager}
                updateWagers={updateWagers}
                addTaker={addTaker}
                removeTaker={removeTaker}
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
