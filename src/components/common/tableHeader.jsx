import React, { Component } from "react";

class TableHeader extends Component {
  sortRasing = (path) => {
    const sortColumns = { ...this.props.sortColumns };
    if (sortColumns.path === path) {
      sortColumns.order = sortColumns.order === "asc" ? "desc" : "asc";
    } else {
      sortColumns.path = path;
      sortColumns.order = "asc";
    }
    this.props.onSort(sortColumns);
  };
  renderSortIcon(column) {
    const { sortColumns } = this.props;

    if (column.path !== sortColumns.path) return null;
    if (sortColumns.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  }
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.sortRasing(column.path);
              }}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
