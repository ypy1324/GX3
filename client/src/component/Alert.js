import React, { useState } from "react";
import "../style/Alert.css";
import moment from "moment";

function Alert(props) {
  const currentDate = new Date();

  return (
    <div className="alert-wrapper">
      {props.itemsList.map((item, i) => {
        {
          const compareDates = Math.floor(
            (new Date(item.expiryDate) - currentDate) / 86400000
          );
          return compareDates < 6 && compareDates > -5 ? (
            <div key={i}>
              <div>{item.name}</div>
              <div>{moment(item.expiryDate).add(1, "days").format("ll")}</div>
              <hr />
            </div>
          ) : null;
        }
      })}
    </div>
  );
}

export default Alert;
