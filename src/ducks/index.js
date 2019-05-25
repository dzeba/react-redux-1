import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";
import products from "./products";

export default combineReducers({
  counter: counter,
  todos: todos,
  products
});
