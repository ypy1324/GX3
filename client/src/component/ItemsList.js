import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/ItemsList.css";
import Warning from "./Warning";
import Form from "react-bootstrap/Form";
import Pagination from "./Pagination";
import Items from "./Items";

function ItemsList({ getItem }) {
  const [itemsList, setItemsList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const filteredItems = itemsList.filter((item) => {
    if (/\d/.test(search)) {
      return (item.barcode + "").includes(search);
    } else {
      return item.name.toLowerCase().includes(search.toLowerCase());
    }
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
          alert("Failed to load items. Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load items. Please try again");
      });
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="itemslist-wrapper">
      {/* <Warning itemsList={itemsList} /> */}
      <div className="search">
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          className="search-input"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
      <Items
        getItem={getItem}
        currentItems={currentItems}
        filteredItems={filteredItems}
      />
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
