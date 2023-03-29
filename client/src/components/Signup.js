import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

function Signup() {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState([]);

    const { handleSignup } = useContext(UserContext);
    
    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
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
        <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
             <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <input
            type="password"
            placeholder="password confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button type="submit">Sign Up</button>
        </form>
        {errors.map((error) => (
            <p key={error}>{error}</p>
        ))}
        </div>
    );
    }

export default Signup;