import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import firebase from "../firebase.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    if (!(email && password)) {
      return alert("Fill in all blanks");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to login");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="wrapper">
      <div>
        <input type="email" onChange={(e) => setEmail(e.currentTarget.value)} />
        <input
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error}
        <button className="btn" onClick={(e) => onLogin(e)}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
