import React, { useEffect, useState } from "react";
import axios from "../../axios";
import MaterialTable from "material-table";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      await axios.get("/getAllOrders").then((res) => {
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
      filtering: false,
    },
    { title: "Order Number", field: "order_id" },
    { title: "Customer Name", field: "customer_name" },
    { title: "Total Cost", field: "total", type: "currency", filtering: false },
  ];

  return (
    <div className="table__container">
      <h2 className="table__header">All Orders</h2>
      <MaterialTable
        columns={columns}
        data={orders}
        options={{
          paging: true,
          showTitle: false,
          filtering: true,
          grouping: true,
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
          }),
        }}
        detailPanel={(rowData) => {
          return <OrderDetail orderData={rowData.order_details} />;
        }}
        onRowClick={(event, selectedRow, togglePanel) => {
          event.preventDefault();
          setSelectedRow(selectedRow.tableData.id);
          togglePanel();
        }}
      />
    </div>
  );
}

export default Orders;
