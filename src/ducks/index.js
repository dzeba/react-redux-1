import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";
import products from "./products";
import auth from "./auth";

export default combineReducers({
  counter: counter,
  todos: todos,
  products,
  auth
});
