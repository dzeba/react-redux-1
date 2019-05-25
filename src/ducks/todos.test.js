import reducer, { changeNewItemText, defaultState, deleteItem } from "./todos";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
describe("changeNewItemText", () => {
  it("works", () => {
    expect(reducer(undefined, changeNewItemText("some"))).toEqual({
      ...defaultState,
      newItemText: "some"
    });
  });
});

describe("deleteItem", () => {
  it("works", async () => {
    const stateWithItem = {
      ...defaultState,
      list: [
        {
          id: 1,
          text: "buy milk1",
          isDone: false
        },
        {
          id: 2,
          text: "buy meat1",
          isDone: true
        }
      ]
    };
    const api = {
      todos: {
        deleteItem: () => Promise.resolve()
      }
    };

    const store = createStore(
      reducer,
      stateWithItem,
      applyMiddleware(ReduxThunk.withExtraArgument({ api }))
    );
    await store.dispatch(deleteItem(1));

    const nextState = store.getState();

    expect(nextState).toEqual({
      ...defaultState,
      list: [
        {
          id: 2,
          text: "buy meat1",
          isDone: true
        }
      ]
    });
  });
});
