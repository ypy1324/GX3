import React from "react";
import Alert from "react-bootstrap/Alert";

function CustomAlert({ setShowAlert }) {
  return (
    <Alert
      className="alert"
      variant="danger"
      onClose={() => setShowAlert(false)}
      dismissible
    >
      Item already exists
    </Alert>
  );
}

export default CustomAlert;
