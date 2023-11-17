import React, { useState } from "react";
import axios from "axios";
import "../style/AddItem.css";

function AddItem() {
  const [formValue, setFormValue] = useState({ name: "", date: null });
  const [disable, setDisable] = useState({ name: true, date: true });

  const onSubmit = (e) => {
    let body = {
      name: formValue.name,
      date: formValue.date,
    };
    axios
      .post("/api/addItem", body)
      .then((res) => {
        if (res.data.success) {
          // success
        } else {
          // fail
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleName = (e) => {
    setFormValue({ ...formValue, name: e.currentTarget.value });
    if (e.currentTarget.value.length == 0) {
      setDisable({ ...disable, name: true });
    } else {
      setDisable({ ...disable, name: false });
    }
  };

  const handleDate = (e) => {
    setFormValue({ ...formValue, date: e.currentTarget.value });
    if (e.currentTarget.value == null) {
      setDisable({ ...disable, date: true });
    } else {
      setDisable({ ...disable, date: false });
    }
  };

  const handleDisable = () => {
    if (disable.name || disable.date) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="add-wrapper">
      <form>
        <input
          className="name-input"
          type="text"
          onChange={(e) => handleName(e)}
        />
        <br />
        <input
          className="date-input"
          type="date"
          onChange={(e) => handleDate(e)}
        />
        <br />
        <button
          className="add-btn"
          disabled={handleDisable()}
          onClick={(e) => onSubmit()}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddItem;
