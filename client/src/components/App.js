import '../App.css';
import React, {useContext, useState, useEffect} from 'react';
import Signup from './Signup';
import Navbar from './Navbar';
import { Route, Switch } from "react-router-dom";
import { UserContext } from '../context/user';
import Home from './Home';
import Login from './Login';

function App() {

  const [wagers, setWagers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const {isLoggedIn} = useContext(UserContext)

  useEffect(() => {
    fetch("/api/wagers")
    .then((r) => {
      if (r.ok) {
        r.json().then(
          (wagers) => {
            console.log(wagers)
            setWagers(wagers)
            setIsLoaded(true)
          }
          )
      } else {
        console.log("error getting wagers")
      }
    })
    
  }, []);

  if (isLoggedIn) {
    return (
      <div className="App">
      <Navbar />  
      
      <Switch>

        <Route exact path ="/login">
          <Login />
        </Route>

        <Route exact path="/">
         {isLoaded ? <Home wagers={wagers}/> : <h2>Loading...</h2>}
        </Route>
     
     </Switch>
   
    </div>
    )
  } 

  return (
    <div className="App">
      <Navbar />  
      
      <Switch>

        <Route exact path ="/login">
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
