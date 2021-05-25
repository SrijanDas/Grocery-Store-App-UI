import React, { useState, useEffect } from "react";
import "./Products.css";
import axios from "../../axios";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddProductModal from "../../components/AddProductModal/AddProductModal";

function Products() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // fetching all products
  useEffect(() => {
    const fetchProducts = async () => {
      await axios.get("/getProducts").then((res) => {
        setData(res.data);
      });
    };
    fetchProducts();
  }, []);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Price Per Unit", field: "price_per_unit" },
    { title: "UOM", field: "uom_name" },
  ];

  const deleteProduct = async (product) => {
    const productToDel = {
      product_id: product.product_id,
    };
    await axios.post("/deleteProduct", productToDel).catch((error) => {
      console.log(error);
    });
  };

  const handleProductChange = (newProduct) => {
    // formatting the new product data for frontend
    let uorm_arr = ["NA", "each", "kg", "gm"];
    const format = {
      name: newProduct.product_name,
      uom_name: uorm_arr[newProduct.uom_id],
      price_per_unit: newProduct.price_per_unit,
    };
    console.log(format);
    console.log(data);
    const newData = [...data, format];
    setData(newData);
  };

  return (
    <div className="table__container">
      <div className="header">
        <div>
          <h2 className="header__text">Products</h2>
        </div>
        <Button
          onClick={handleClickOpen}
          className="header__Addbtn"
          variant="outlined"
          color="primary"
          startIcon={<AddBoxIcon />}
        >
          Add Product
        </Button>
      </div>
      <div className="table">
        <MaterialTable
          columns={columns}
          data={data}
          options={{
            paging: true,
            pageSize: 10,
            pageSizeOptions: [10, 20, 30],
            showTitle: false,
            filtering: true,
            grouping: true,
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  const productToDelete = dataDelete[index];
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
                  deleteProduct(productToDelete);
                }, 1000);
              }),
          }}
        />
      </div>
      {open ? (
        <AddProductModal
          handleProductChange={handleProductChange}
          handleClose={handleClose}
          open={open}
        />
      ) : null}
    </div>
  );
}

export default Products;
