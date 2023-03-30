import '../App.css';
import React, {useContext} from 'react';
import Signup from './Signup';
import Navbar from './Navbar';
import { Route, Switch } from "react-router-dom";
import { UserContext } from '../context/user';
import Home from './Home';
import Login from './Login';

function App() {

  const {isLoggedIn} = useContext(UserContext)

  return (
    <div className="App">
      <Navbar />  
      
      <Switch>

        <Route exact path ="/login">
          <Login />
        </Route>

        <Route exact path="/">
         {isLoggedIn ? <Home /> : <Signup />}
        </Route>
     
     </Switch>
   
    </div>
  );
}

export default App;
