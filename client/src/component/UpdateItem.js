import React, { useState } from "react";
import axios from "axios";
import "../style/UpdateItem.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";

function UpdateItem({ item }) {
  const [formValue, setFormValue] = useState({
    barcode: item.barcode,
    name: item.name,
    expiryDate: moment(item.expiryDate).add(1, "days").format("YYYY-MM-DD"),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onUpdate = () => {
    setIsLoading(true);
    let body = {
      id: item._id,
      barcode: formValue.barcode,
      name: formValue.name,
      expiryDate: formValue.expiryDate,
    };
    axios
      .post("/api/updateItem", body)
      .then((res) => {
        if (res.data.success) {
          // success
        } else {
          alert("Failed to update item. Please try again");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update item. Please try again");
        setIsLoading(false);
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
    <div className="update-wrapper">
      <div className="update-border">
        <form onSubmit={() => onUpdate()}>
          <Form.Label>Barcode</Form.Label>
          <Form.Control
            className="update-input"
            value={formValue.barcode}
            type="number"
            onChange={(e) =>
              setFormValue({ ...formValue, barcode: e.currentTarget.value })
            }
          />
          <br />
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            className="update-input"
            value={formValue.name}
            type="text"
            onChange={(e) =>
              setFormValue({ ...formValue, name: e.currentTarget.value })
            }
          />
          <br />
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control
            className="update-input"
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
            className="update-btn"
            disabled={handleDisable()}
          >
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <div>Update</div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateItem;
