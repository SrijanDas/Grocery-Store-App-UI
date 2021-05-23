import React from "react";
import "./AddProduct.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function AddProduct({ handleDelete, indx, products, qtyRef, productIdRef }) {
  // const [order, setOrder] = useState([]);
  console.log(productIdRef, qtyRef);
  const handleProductChange = (e) => {
    console.log("Changing product...", e.target.value);
  };

  // const createOrder = (e) => {
  //   const values = [...order];
  //   let newOrder = {
  //     product_id: e.target.value,
  //     quantity: qty.current.value,
  //   };
  //   values.push(newOrder);
  //   setOrder(values);
  //   console.log("Order...", order);
  // };

  return (
    <div className="products__input">
      <TextField
        className="product__select"
        label="Product"
        variant="outlined"
        type="text"
        value={productIdRef}
        onChange={handleProductChange}
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
        ref={qtyRef}
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
  );
}

export default AddProduct;
