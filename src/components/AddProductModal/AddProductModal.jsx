import React, { useEffect, useState } from "react";
import "./AddProductModal.css";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "../../axios";

function AddProductModal(props) {
  const [options, setOptions] = useState([]);
  const [uom, setUom] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const getUOM = async () => {
      await axios
        .get("/getUOM")
        .then((res) => {
          setOptions(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUOM();
  }, []);

  const handleChange = (event) => {
    setUom(event.target.value);
  };

  const handleSubmit = async () => {
    const newProduct = {
      product_name: productName,
      uom_id: uom,
      price_per_unit: price,
    };

    await axios
      .post("/insertProduct", newProduct)
      .then((res) => {
        props.handleProductChange(newProduct);
        props.handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="draggable-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
        Add a New Product
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <div className="addProductForm__name">
            <TextField
              fullWidth={true}
              label="Product Name"
              type="text"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>
          <div className="addProductForm__price">
            <TextField
              label="Price per unit"
              type="number"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="addProductForm__uom">
            <TextField
              className="addProductForm__uom"
              label="UOM"
              select
              variant="outlined"
              helperText="Please select Unit of Measure"
              value={uom}
              onChange={handleChange}
            >
              {options.map((option) => (
                <MenuItem key={option.uom_id} value={option.uom_id}>
                  {option.uom_name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductModal;
