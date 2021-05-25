import React from "react";

function Table() {
  return (
    <div>
      <MaterialTable
        columns={columns}
        data={data}
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

export default Table;
