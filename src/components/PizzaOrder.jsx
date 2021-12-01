import { React } from "react";

const PizzaOrder = ({ pizza }) => {
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{pizza.name}</h4>
      <div className="pizza-block__selector">Type {pizza.type}</div>
      <div className="pizza-block__selector">Size {pizza.size}</div>
      <div className="pizza-block__price">Price {pizza.price}</div>
    </div>
  );
};

export default PizzaOrder;
