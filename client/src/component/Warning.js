import React from "react";
import "../style/Warning.css";
import moment from "moment";
import Table from "react-bootstrap/Table";

function Warning(props) {
  const currentDate = new Date();

  return (
    <div className="warning-wrapper">
      <h1>!!!</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Item Name</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {props.itemsList.map((item, i) => {
            const compareDates = Math.floor(
              (new Date(item.expiryDate) - currentDate) / 86400000
            );
            return compareDates < 21 && compareDates > -4 ? (
              <tr key={i}>
                <td>{item.barcode}</td>
                <td>{item.name}</td>
                <td>{moment(item.expiryDate).add(1, "days").format("ll")}</td>
              </tr>
            ) : null;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Warning;
