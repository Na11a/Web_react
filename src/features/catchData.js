import axios from "axios";

export function getPizzas() {
  return axios
    .get("http://localhost:8000/api/pizzas/")
    .then((response) => response.data);
}
export function getPizzasByCategory(category) {
  return axios
    .get(`http://localhost:8000/api/pizzas/?category=${category}`)
    .then((response) => response.data);
}
