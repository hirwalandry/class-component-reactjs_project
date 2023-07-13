import React from "react";

const ListGroup = ({
  allGenre,
  valuesProperty,
  textProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {allGenre.map((genre) => (
        <li
          className={
            genre === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          key={genre[valuesProperty]}
          onClick={() => {
            onItemSelect(genre);
          }}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valuesProperty: "_id",
};
export default ListGroup;
