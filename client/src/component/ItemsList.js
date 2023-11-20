import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/ItemsList.css";
import moment from "moment";
import Alert from "./Alert";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function ItemsList() {
  const [itemsList, setItemsList] = useState([]);
  const [search, setSearch] = useState("");
  const filteredItems = itemsList.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    axios
      .post("/api/itemslist")
      .then((res) => {
        if (res.data.success) {
          setItemsList([...res.data.itemsList]);
        } else {
          // fail
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Delete item?")) {
      let body = {
        id: id,
      };
      axios
        .post("/api/deleteItem", body)
        .then((res) => {
          if (res.data.success) {
            // success
            window.location.reload();
          } else {
            // fail
          }
        })
        .catch((err) => {
          // fail
        });
    }
  };

  return (
    <div>
      <Alert itemsList={itemsList} />
      <div className="search">
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          className="search-input"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
      <div className="itemslist-wrapper">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Expiry Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{moment(item.expiryDate).add(1, "days").format("ll")}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ItemsList;
