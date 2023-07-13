import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ onSort, sortColumns, data, columns }) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumns={sortColumns}
        onSort={onSort}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
