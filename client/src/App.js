import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import MainPage from "./component/MainPage";
import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "./reducer/userSlice";
import firebase from "./firebase";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log(userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
