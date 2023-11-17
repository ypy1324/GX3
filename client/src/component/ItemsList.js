import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/ItemsList.css";
import moment from "moment";
import Alert from "./Alert";

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

  // const onEdit = () => {};

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <Alert itemsList={itemsList} />
      <div className="itemslist-wrapper">
        {filteredItems.map((item, i) => {
          return (
            <div key={i}>
              <div>{item.name}</div>
              <div>{moment(item.expiryDate).add(1, "days").format("ll")}</div>
              <button onClick={(e) => onDelete(item._id)}>Delete</button>
              {/* <button onClick={(e) => onEdit()}>Edit</button> */}
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemsList;
