import { React, useState } from "react";
const Categories = ({ items, selectCategory }) => {
  const onSelectItem = (index) => {
    setActiveItem(index);
    selectCategory(index);
  };
  const [activeItem, setActiveItem] = useState();
  return (
    <ul>
      <li
        className={activeItem === null ? "active" : ""}
        onClick={() => onSelectItem(null)}
      >
        Все
      </li>
      {items.map((name, index) => (
        <li
          key={index}
          className={activeItem === index ? "active" : ""}
          onClick={() => onSelectItem(index)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};
export default Categories;
