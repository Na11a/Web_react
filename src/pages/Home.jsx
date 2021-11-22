import { React, useState, useEffect } from "react";
import { SortPopup, Categories, PizzaCart } from "../components";

const Home = ({ addPizza, deletePizza }) => {
  const [pizzas, setPizzas] = useState([]);
  const [currentPizzas, setCurrentPizzas] = useState([]);
  const selectCategory = (category) => {
    category === null
      ? setCurrentPizzas(pizzas)
      : setCurrentPizzas(pizzas.filter((pizza) => pizza.category === category));
  };
  useEffect(() => {
    fetch("http://localhost:3000/db.json")
      .then((response) => response.json())
      .then((json) => {
        setCurrentPizzas(json.pizzas);
        setPizzas(json.pizzas);
      });
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <div className="categories">
          <Categories
            items={["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]}
            selectCategory={selectCategory}
          />
        </div>
        <SortPopup items={["популярности", "цене", "алфавиту"]} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {currentPizzas &&
          currentPizzas.map((pizza) => (
            <PizzaCart
              key={pizza.id}
              pizza={pizza}
              addPizza={addPizza}
              deletePizza={deletePizza}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
