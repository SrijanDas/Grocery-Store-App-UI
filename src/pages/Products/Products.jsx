import React, { useState, useEffect } from "react";
import axios from "../../axios";
import MaterialTable from "material-table";

function Products() {
  const [data, setData] = useState([]);

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

  const addProductToDb = async (newData) => {
    const inputUom = String(newData.uom_name).toLowerCase();

    let uomId = 0;
    if (inputUom === "each") {
      uomId = 1;
    } else if (inputUom === "kg") {
      uomId = 2;
    } else if (inputUom === "gm") {
      uomId = 3;
    } else {
      uomId = 0;
    }
    const newProduct = {
      product_name: newData.name,
      uom_id: uomId,
      price_per_unit: newData.price_per_unit,
    };

    await axios
      .post("/insertProduct", newProduct)
      .then(() => {
        console.log("Product added...");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = async (product) => {
    const productToDel = {
      product_id: product.product_id,
    };
    await axios.post("/deleteProduct", productToDel).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="table__container">
      <h2 className="table__header">Products</h2>
      <MaterialTable
        style={{ marginBottom: "20px" }}
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
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                resolve();
                addProductToDb(newData);
              }, 1000);
            }),
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
  );
}

export default Products;
