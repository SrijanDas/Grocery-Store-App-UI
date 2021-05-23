import React from "react";
import Button from "@material-ui/core/Button";
import "./ButtonGroup.css";
import { Link } from "react-router-dom";

function ButtonGroup() {
  return (
    <div className="buttonGroup">
      <Button
        component={Link}
        to="/newOrder"
        className="newOrderBtn"
        variant="contained"
        color="primary"
      >
        New Order
      </Button>
      <Button
        component={Link}
        to="/products"
        className="manageBtn"
        variant="contained"
        color="primary"
      >
        Manage Products
      </Button>
    </div>
  );
}

export default ButtonGroup;
