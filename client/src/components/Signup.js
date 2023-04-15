import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/user";

function Signup() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);

  const { handleSignup } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        password_confirmation: passwordConfirmation,
        username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          handleSignup(data);
        }
      });
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-violet-200 text-2xl">Sign Up for Sideline</h1>
      <form
        className="flex flex-col items-center p-4 bg-gray-700 rounded-lg shadow-lg mt-8 mb-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="username"
          className="input input-primary w-full max-w-xs mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="input input-primary w-full max-w-xs mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="password confirmation"
          className="input input-primary w-full max-w-xs mb-4"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button className="btn btn-primary btn-wide mb-4" type="submit">
          Sign Up
        </button>
        {errors.length > 0 && (
          <p className="text-red-400">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </p>
        )}
      </form>

      <div className="flex flex-col items-center">
        <h3 className="mb-2">Already have an account?</h3>
        <NavLink to="/login">
          <button className="btn">Login</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Signup;
