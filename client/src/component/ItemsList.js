import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/ItemsList.css";
import moment from "moment";
import Alert from "./Alert";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "./Pagination";

function ItemsList({ getItem }) {
  const [itemsList, setItemsList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const filteredItems = itemsList.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <div className="pagination">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredItems.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default ItemsList;
