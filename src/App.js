import { React, useState } from "react";
import "./scss/app.scss";
import { Home, Cart } from "./pages";
import { Header } from "./components";
import { Route, Routes } from "react-router-dom";

function App() {
  const [order, setOrder] = useState([]);
  const addPizza = (pizza) => {
    let new_order = order;
    new_order.push(pizza);
    setOrder(new_order);
  };
  const deletePizza = (pizza) => {
    let new_order = order;
    setOrder(new_order.filter((item) => item.id !== pizza.id))
  };
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={<Home addPizza={addPizza} deletePizza={deletePizza} />}
            exact
          />
          <Route path="/cart" element={<Cart order={order} />} exact />
        </Routes>
      </div>
    </div>
  );
}

export default App;
