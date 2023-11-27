import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";

function Items({ getItem, currentItems }) {
  const onDelete = (id) => {
    if (window.confirm("Delete item?")) {
      let body = {
        id: id,
      };
      axios
        .post("/api/deleteItem", body)
        .then((res) => {
          if (res.data.success) {
            window.location.reload();
          } else {
            alert("Failed to delete item. Please try again");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to delete item. Please try again");
        });
    }
  };

  return (
    <div className="itemslist-wrapper">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Item Name</th>
            <th>Expiry Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.barcode}</td>
                <td>{item.name}</td>
                <td>{moment(item.expiryDate).add(1, "days").format("ll")}</td>
                <td>
                  <Button
                    className="delete-btn"
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(item._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="update-btn"
                    variant="outline-success"
                    size="sm"
                    onClick={() => getItem(item)}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Items;
