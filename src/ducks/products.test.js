import reducer, {
  defaultState,
  fetchProducts,
  productsSelector
} from "./products";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { combineReducers } from "redux";

it("fetches products", async () => {
  const products = [{ id: 1, name: "product1" }];

  const api = {
    products: {
      getAll: () => Promise.resolve(products)
    }
  };

  const store = createStore(
    combineReducers({ products: reducer }),
    { products: defaultState },
    applyMiddleware(ReduxThunk.withExtraArgument({ api }))
  );

  await store.dispatch(fetchProducts());

  expect(productsSelector(store.getState())).toEqual(products);
});
