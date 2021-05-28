import React, { useState, useEffect } from "react";
import "./NewOrder.css";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import axios from "../../axios";
import OrderForm from "../../components/OrderForm/OrderForm";

function NewOrder() {
  const [orderDetails, setOrderDetails] = useState([
    { index: 0, product: "", quantity: "" },
  ]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      await axios.get("/getProducts").then((res) => {
        setProducts(res.data);
      });
    };
    getProducts();
  }, []);

  const addNewRow = (e) => {
    setOrderDetails([
      ...orderDetails,
      { index: orderDetails.length, product: "", quantity: "" },
    ]);
  };

  const handleDelete = (indx) => {
    console.log("Deleting...", indx);
    // let data = orderDetails
    // setOrderDetails(orderDetails.filter((r) => r !== record));
  };

  const handleProductChange = (e, i) => {
    // if (["name", "quantity"].includes(e.target.name)) {
    //   // let orderDetails = [...orderDetails];
    //   orderDetails[e.target.dataset.id][e.target.name] = e.target.value;
    // } else {
    //   setOrderDetails({ [e.target.name]: e.target.value });
    // }
    console.log(orderDetails);
    console.log(i, e.target.value);
  };

  const handleQtyChange = (e, i) => {
    console.log(orderDetails);
    console.log(i, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting form");
  };

  return (
    <div className="newOrder">
      <form onSubmit={handleSubmit}>
        <TextField label="Customer Name" type="text" />
        <IconButton
          onClick={addNewRow}
          aria-label="delete"
          className="deleteBtn"
        >
          <AddIcon />
        </IconButton>
        <OrderForm
          add={addNewRow}
          delete={handleDelete}
          orderDetails={orderDetails}
          products={products}
          handleProductChange={handleProductChange}
          handleQtyChange={handleQtyChange}
        />
        <Button
          className="submmitBtn"
          variant="contained"
          type="submit"
          color="primary"
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default NewOrder;
