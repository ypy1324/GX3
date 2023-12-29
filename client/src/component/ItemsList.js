import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/ItemsList.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Items from "./Items";
import ReactPaginate from "react-paginate";

function ItemsList({ getItem }) {
  const [itemsList, setItemsList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const filteredItems = itemsList.filter((item) => {
    if (/\d/.test(search)) {
      return (item.barcode + "").includes(search);
    } else {
      return item.name.toLowerCase().includes(search.toLowerCase());
    }
  });
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .post("/api/itemslist")
      .then((res) => {
        if (res.data.success) {
          setItemsList([...res.data.itemsList]);
        } else {
          alert("Failed to load items. Please try again");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load items. Please try again");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="itemslist-wrapper">
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <div>
          <div className="search">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              className="search-input"
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </div>
          <Items getItem={getItem} currentItems={currentItems} />
          <div>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemsList;
