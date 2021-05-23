import React, { useState, useEffect, useRef } from "react";
import "./NewOrder.css";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "../../axios";

function NewOrder() {
  const [inputList, setInputList] = useState([{ product: "", quantity: 0 }]);
  const [products, setProducts] = useState([]);

  const [productId, setProductId] = useState("");
  const qty = useRef(0);

  useEffect(() => {
    const getProducts = async () => {
      await axios.get("/getProducts").then((res) => {
        setProducts(res.data);
      });
    };
    getProducts();
  }, []);

  function handleAdd() {
    const values = [...inputList];
    values.push({ product: "", quantity: 0 });
    setInputList(values);
  }
  const handleDelete = (i) => {
    const values = [...inputList];
    values.splice(i, 1);
    console.log("Deleting index: ", i);
    setInputList(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting form");
  };

  return (
    <div className="newOrder">
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField label="Customer Name" type="text" />
        <IconButton
          onClick={() => handleAdd()}
          aria-label="delete"
          className="deleteBtn"
        >
          <AddIcon />
        </IconButton>
        {inputList.map((input, indx) => (
          <div key={`${input}-${indx}`} className="products__input">
            <TextField
              className="product__select"
              label="Product"
              variant="outlined"
              type="text"
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
              }}
              select
            >
              {products.map((product) => (
                <MenuItem key={product.product_id} value={product.product_id}>
                  {product.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className="product__qty"
              label="Qty."
              variant="outlined"
              type="number"
              ref={qty}
            />
            <div>
              <p className="product_price">Price:</p>
              <p className="product_price">0.0/uom</p>
            </div>
            <div className="product__total">
              <p>Total:</p>
              <p>0.0</p>
            </div>
            <IconButton
              onClick={() => {
                handleDelete(indx);
              }}
              aria-label="delete"
              className="deleteBtn"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
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
