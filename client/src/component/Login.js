import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import firebase from "../firebase.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to login");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-border">
        <form onSubmit={(e) => onLogin(e)}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            className="login-input"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <br />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            className="login-input"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <br />
          <div className="error-msg">
            <Form.Text>{error}</Form.Text>
          </div>
          <Button type="submit" variant="outline-light">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
