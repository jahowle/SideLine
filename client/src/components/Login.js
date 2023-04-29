import React, { useState, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { UserContext } from "../context/user";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const { handleLogin } = useContext(UserContext);

  const history = useHistory();

  console.log("Errors", errors);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((r) => {
      if (r.ok) {
        console.log("Login: Success");
        r.json().then((user) => handleLogin(user));
        history.push("/");
      } else {
        r.json().then((errorData) => setErrors(errorData.error));
      }
    });
  }

  function handleGoogleLogin() {
    fetch("/api/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-violet-200 text-2xl">Login</h1>
      <form
        className="flex flex-col items-center p-4 bg-gray-700 rounded-lg shadow-lg mt-8 mb-4"
        onSubmit={handleSubmit}
      >
        <label className="mb-2" for="username">
          Username
        </label>
        <input
          name="username"
          className="input input-primary w-full max-w-xs mb-4"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="mb-2" for="password">
          Password
        </label>
        <input
          name="password"
          className="input input-primary w-full max-w-xs mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary btn-wide mb-4" type="submit">
          Login
        </button>
        {errors.length > 0 && <p className="text-red-400">{errors}</p>}
      </form>

      <div className="flex flex-col items-center">
        <h3 className="mb-2">Don't have an account yet?</h3>
        <NavLink to="/">
          <button className="btn">Signup</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
