import { React, useState, useEffect } from "react";
import { SortPopup, Categories, PizzaCart } from "../components";
import { AutoComplete } from "antd";
import { getPizzas,getPizzasByCategory } from "../features/catchData";

import axios from "axios";

const Catalog = ({ addPizza, deletePizza }) => {
  const comparePizzasPyPrice = (a, b) => {
    return a.price - b.price;
  };

  const [pizzas, setPizzas] = useState([]);
  const [currentPizzas, setCurrentPizzas] = useState([]);
  const [sortValue, setSortValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState();
  const selectCategory = (category) => {
    setCategoryValue(category);

    if (category === null) {
      getPizzas().then((pizzas) => setCurrentPizzas(pizzas));
    } else {
      getPizzasByCategory(category).then(pizzas => setCurrentPizzas(pizzas))
    }
  };
  const sortPizzas = (activeValue) => {
    if (activeValue === "популярности") {
      setCurrentPizzas(currentPizzas.sort((a, b) => a.rating - b.rating));
    }
    if (activeValue === "цене") {
      setCurrentPizzas(currentPizzas.sort(comparePizzasPyPrice));
    }

  };
  console.log(currentPizzas);
  useEffect(() => {
    sortPizzas(sortValue);
  }, [sortValue]);
  useEffect(() => {
    getPizzas().then((data) => {
      setCurrentPizzas(data);
      setPizzas(data);
      setSortValue(null);
    });
  }, []);
  const getCurrentPizzasByTypeAndValue = () => {
    selectCategory(categoryValue);
    sortPizzas(sortValue);
  };
  const handleSearch = (value) => {
    value = value.toUpperCase();
    console.log(value);
    if (value !== "") {
      setCurrentPizzas(
        pizzas.filter((pizza) => pizza.name.toUpperCase().includes(value))
      );
    } else {
      setCurrentPizzas(pizzas);
    }
  };

  return (
    <div className="container">
      <AutoComplete
        onSearch={handleSearch}
        style={{
          width: 200,
        }}
        placeholder="input here"
      />
      <div className="content__top">
        <div className="categories">
          <Categories
            items={["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]}
            selectCategory={selectCategory}
          />
        </div>
        <SortPopup
          items={["популярности", "цене", "алфавиту"]}
          activeValue={setSortValue}
        />
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

export default Catalog;
