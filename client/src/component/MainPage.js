import React from "react";
import ItemsList from "./ItemsList";
import AddItem from "./AddItem";
import { useSelector } from "react-redux";
import firebase from "../firebase";
import Button from "react-bootstrap/Button";
import "../style/MainPage.css";

function MainPage() {
  const onLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
      <div className="logout-btn">
        <Button variant="outline-warning" onClick={() => onLogout()}>
          Log Out
        </Button>
      </div>
      <AddItem />
      <ItemsList />
    </div>
  );
}

export default MainPage;
