import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

function OrderForm(props) {
  return (
    <>
      {props.orderDetails.map((val, idx) => (
        <div key={val.index} className="products__input">
          <TextField
            className="product__select"
            label="Product"
            variant="outlined"
            onChange={(e) => {
              props.handleProductChange(e, idx);
            }}
            select
          >
            {props.products.map((product) => (
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
            defaultValue=""
            onChange={(e) => {
              props.handleQtyChange(e, idx);
            }}
          />

          <IconButton
            onClick={() => {
              props.delete(idx);
            }}
            aria-label="delete"
            className="deleteBtn"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </>
  );
}

export default OrderForm;
