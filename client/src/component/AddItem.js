import React, { useState } from "react";
import axios from "axios";
import "../style/AddItem.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomAlert from "./CustomAlert";

function AddItem() {
  const [formValue, setFormValue] = useState({
    barcode: 0,
    name: "",
    expiryDate: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const onAdd = (e) => {
    let body = {
      barcode: formValue.barcode,
      name: formValue.name,
      expiryDate: formValue.expiryDate,
    };
    axios
      .post("/api/addItem", body)
      .then((res) => {
        if (res.data.exist) {
          setShowAlert(true);
        } else if (res.data.success) {
          window.location.reload();
        } else {
          alert("Failed to add item. Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add item. Please try again");
      });
  };

  const handleDisable = () => {
    if (
      formValue.barcode !== 0 &&
      formValue.name !== "" &&
      formValue.expiryDate !== ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="add-wrapper">
      <div className="add-border">
        <Form.Label>Barcode</Form.Label>
        <Form.Control
          className="add-input"
          value={formValue.barcode}
          type="number"
          onChange={(e) =>
            setFormValue({ ...formValue, barcode: e.currentTarget.value })
          }
        />
        <br />
        <Form.Label>Item Name</Form.Label>
        <Form.Control
          className="add-input"
          value={formValue.name}
          type="text"
          onChange={(e) =>
            setFormValue({ ...formValue, name: e.currentTarget.value })
          }
        />
        <br />
        <Form.Label>Expiry Date</Form.Label>
        <Form.Control
          className="add-input"
          value={formValue.expiryDate}
          type="date"
          onChange={(e) =>
            setFormValue({ ...formValue, expiryDate: e.currentTarget.value })
          }
        />
        <br />
        <Button
          variant="light"
          type="submit"
          className="add-btn"
          disabled={handleDisable()}
          onClick={(e) => {
            onAdd(e);
          }}
        >
          Add
        </Button>
        {showAlert ? <CustomAlert setShowAlert={setShowAlert} /> : null}
      </div>
    </div>
  );
}

export default AddItem;
