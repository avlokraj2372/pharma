import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setErrorMessage("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { username, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        setErrorMessage("");
        setIsLoggedIn(true);

        window.location.href = "/";  // Redirect to home page
      }
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <div className="login-container">
      <h2>{isLoggedIn ? "Welcome!" : "Login"}</h2>
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <p>You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!isLoggedIn && (
        <Link to="/signup">
          <button type="button">Signup</button>
        </Link>
      )}
    </div>
  );
};

export default Login;
