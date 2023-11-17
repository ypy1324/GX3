import React from "react";
import ItemsList from "./ItemsList";
import AddItem from "./AddItem";
import { useSelector } from "react-redux";
import firebase from "../firebase";

function MainPage() {
  const user = useSelector((state) => state.user);

  const onLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
      <button onClick={() => onLogout()}>Log Out</button>
      <AddItem />
      <ItemsList />
    </div>
  );
}

export default MainPage;
