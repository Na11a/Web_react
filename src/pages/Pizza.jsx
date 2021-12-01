import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PizzaCart } from "../components";
import { getPizzas } from "../features/catchData";
import axios from "axios";

const PizzaPage = (props) => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  console.log(pizza);
  useEffect(() => {
    getPizzas()
      .then((data) => {
        setPizza(data.filter((pizza) => pizza.id === parseInt(id))[0]);
      });
  }, []);
  return (
    <div className="content__items">{pizza && <PizzaCart pizza={pizza} />}</div>
  );
};

export default PizzaPage;
