import { React, useState, useEffect } from "react";
import { PizzaOrder } from "../components";
const Cart = ({ order }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (order.length !== 0) {
      setTotalPrice(
        order.reduce((sum, pizza) => (sum += parseFloat(pizza.price)), 0)
      );
    }
  }, []);
  return (
    <div className="content__items">
      <h1>total sum = {totalPrice}</h1>

      {order &&
        order.map((pizza) => <PizzaOrder pizza={pizza} key={pizza.id} />)}
    </div>
  );
};

export default Cart;
