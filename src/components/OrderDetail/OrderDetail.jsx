import React from "react";
import MaterialTable from "material-table";
import "./OrderDetail.css";
function OrderDetail({ orderData }) {
  const columns = [
    {
      title: "Product Name",
      field: "product_name",
    },
    { title: "Qty.", field: "quantity" },
    { title: "Price Per Unit", field: "price_per_unit" },
    { title: "Total Cost", field: "total_price", type: "currency" },
  ];

  return (
    <div>
      <MaterialTable
        style={{
          padding: "20px",
          paddingBottom: "80px",
          backgroundColor: "#F5F5F5",
          borderBottom: "1px solid black",
        }}
        columns={columns}
        data={orderData}
        options={{
          search: false,
          paging: false,
          toolbar: false,
          headerStyle: { backgroundColor: "#F5F5F5", color: "blue" },
        }}
      />
    </div>
  );
}

export default OrderDetail;
