import React, { useState } from "react";
import ItemsList from "./ItemsList";
import AddItem from "./AddItem";
import UpdateItem from "./UpdateItem";
import firebase from "../firebase";
import Button from "react-bootstrap/Button";
import "../style/MainPage.css";

function MainPage() {
  const [item, setItem] = useState(null);

  const onLogout = () => {
    firebase.auth().signOut();
  };

  const getItem = (item) => {
    setItem(item);
  };

  return (
    <div>
      <div className="logout-btn">
        <Button variant="outline-warning" onClick={() => onLogout()}>
          Log Out
        </Button>
      </div>
      {item ? <UpdateItem item={item} /> : <AddItem />}
      <ItemsList getItem={getItem} />
    </div>
  );
}

export default MainPage;
