import React, {useState, useEffect} from "react";

// create the context
const UserContext = React.createContext();

// create a provider component
function UserProvider({ children }) {

    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetch("/api/me")
      .then((response) => {
      if (response.ok) {
        response.json().then((user) => handleLogin(user))
        console.log("Auto Login: response OK");
      }
      else {
        console.log("Auto Login: response not OK")
      }
    })
    
  }, []);


  function handleLogin(user) {
    setUser(user)
    setIsLoggedIn(true)
  }

  function handleSignup(user) {
    setUser(user)
    setIsLoggedIn(true)
  }

  function onLogout() {
    setUser("")
    setIsLoggedIn(!isLoggedIn)
  }

  return <UserContext.Provider value={{user, setUser, handleSignup, handleLogin, isLoggedIn, setIsLoggedIn, onLogout}}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
