import React, { useEffect, useState } from "react";
import "./OrderTable.css";
import MaterialTable from "material-table";
import axios from "../../axios";
import OrderDetail from "../OrderDetail/OrderDetail";

function OrderTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      await axios.get("/recentOrders").then((res) => {
        setOrders(res.data);
      });
    };
    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Date",
      field: "datetime",
      type: "datetime",
    },
    { title: "Order Number", field: "order_id" },
    { title: "Customer Name", field: "customer_name" },
    { title: "Total Cost", field: "total", type: "currency" },
  ];
  return (
    <div className="table__container">
      <h2 className="table__header">Recent Orders</h2>
      <MaterialTable
        style={{ marginBottom: "20px" }}
        columns={columns}
        data={orders}
        options={{ search: false, paging: false, toolbar: false }}
        detailPanel={(rowData) => {
          return <OrderDetail orderData={rowData.order_details} />;
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </div>
  );
}

export default OrderTable;
