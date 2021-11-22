import { React, useState, useEffect } from "react";
import { Button } from "./index";
import classNames from "classnames";
const PizzaCart = ({ pizza, addPizza, deletePizza }) => {
  const pizzasType = ["традиционное", "тонкое"];
  const sizes = [26, 30, 40];
  const priceSizeCoefs = { 26: 1, 30: 1.2, 40: 1.5 };
  const priceTypeCoefs = { традиционное: 1, тонкое: 1.1 };
  const [activeType, setActiveType] = useState(pizzasType[pizza.types[0]]);
  const [activeSize, setActiveSize] = useState(pizza.sizes[0]);
  const [currentPrice, setCurrentPrice] = useState(pizza.price);
  const [buttonStatus, setButtonStatus] = useState(true);
  const countPrice = () => {
    return (
      pizza.price *
      priceTypeCoefs[activeType] *
      priceSizeCoefs[activeSize]
    ).toFixed(2);
  };
  const onSelectType = (name) => {
    setActiveType(name);
  };
  const onSelectSize = (size) => {
    setActiveSize(size);
  };
  useEffect(() => {
    setCurrentPrice(countPrice());
  }, [activeSize, activeType]);
  const onPizzaSelect = (pizza) => {
    let new_pizza = {...pizza}
    new_pizza.price = currentPrice;
    new_pizza.type = activeType;
    new_pizza.size = activeSize;
    setButtonStatus(!buttonStatus);
    buttonStatus === true ? addPizza(new_pizza) : deletePizza(new_pizza);
  };
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{pizza.name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {pizzasType.map((name, index) => (
            <li
              onClick={() => onSelectType(name)}
              key={index}
              className={classNames({
                active: activeType === name,
                disabled: !pizza.types.includes(index),
              })}
            >
              {name}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              className={classNames({
                active: activeSize === size,
                disabled: !pizza.sizes.includes(size),
              })}
              onClick={() => onSelectSize(size)}
            >
              {size}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{currentPrice} ₽</div>
        <Button outline onClick={() => onPizzaSelect(pizza)}>
          {buttonStatus === true ? "Добавить" : "Удалить"}
        </Button>
      </div>
    </div>
  );
};

export default PizzaCart;
