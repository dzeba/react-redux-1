import { createSelector } from "reselect";

const appName = "react-redux2";
const prefix = `${appName}/todos`;
const moduleName = "todos";

//action
const CHANGE_NEW_ITEM_TEXT = `${prefix}/CHANGE_NEW_ITEM_TEXT`;
// const ADD_NEW_ITEM = `${prefix}/ADD_NEW_ITEM`;
const HANDLE_IS_DONE = `${prefix}/HANDLE_IS_DONE`;
const CHANGE_TEXT = `${prefix}/CHANGE_TEXT`;
// const DELETE_ITEM = `${prefix}/DELETE_ITEM`;
const FETCH_LIST_REQUEST = `${prefix}/FETCH_LIST_REQUEST`;
const FETCH_LIST_SUCCESS = `${prefix}/FETCH_LIST_SUCCESS`;
const FETCH_LIST_FAILURE = `${prefix}/FETCH_LIST_FAILURE`;

const SAVE_ITEM_REQUEST = `${prefix}/SAVE_ITEM_REQUEST`;
const SAVE_ITEM_SUCCESS = `${prefix}/SAVE_ITEM_SUCCESS`;
const SAVE_ITEM_FAILURE = `${prefix}/SAVE_ITEM_FAILURE`;

const DELETE_ITEM_REQUEST = `${prefix}/DELETE_ITEM_REQUEST`;
const DELETE_ITEM_SUCCESS = `${prefix}/DELETE_ITEM_SUCCESS`;
const DELETE_ITEM_FAILURE = `${prefix}/DELETE_ITEM_FAILURE`;
// const BASE_URL = "http://localhost:3004";
//action creators

export const changeNewItemText = text => ({
  type: CHANGE_NEW_ITEM_TEXT,
  payload: text
});

export const handleIsDone = (itemId, isDone) => ({
  type: HANDLE_IS_DONE,
  payload: {
    itemId,
    isDone
  }
});
export const changeText = (itemId, text) => ({
  type: CHANGE_TEXT,
  payload: {
    itemId,
    text
  }
});
export const showAll = () => ({
  type: "SET_FILTER",
  payload: "ALL"
});
export const showActive = () => ({
  type: "SET_FILTER",
  payload: "ACTIVE"
});
export const showDone = () => ({
  type: "SET_FILTER",
  payload: "DONE"
});

export const addNewItem = () => async (dispatch, getState, { api }) => {
  // dispatch({
  //   type: ADD_NEW_ITEM,
  //   payload: {
  //     id: getId()
  //   }
  // });

  const state = stateSelector(getState());
  const newItem = {
    id: getId(),
    text: state.newItemText,
    isDone: false
  };

  dispatch({
    type: SAVE_ITEM_REQUEST
  });
  try {
    const data = await api.todos.create(newItem);
    dispatch({
      type: SAVE_ITEM_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SAVE_ITEM_FAILURE,
      payload: error
    });
  }
};
export const deleteItem = itemId => async (dispatch, getState, { api }) => {
  dispatch({ type: DELETE_ITEM_REQUEST, payload: itemId });

  try {
    const data = await api.todos.deleteItem(itemId);
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: itemId });
  } catch (error) {
    dispatch({
      type: DELETE_ITEM_FAILURE,
      payload: error
    });
  }
};
export const fetchList = () => async (dispatch, getState, { api }) => {
  dispatch({
    type: FETCH_LIST_REQUEST
  });
  try {
    const data = await api.todos.getAll().then(data =>
      dispatch({
        type: FETCH_LIST_SUCCESS,
        payload: data
      })
    );
  } catch (error) {
    dispatch({
      type: FETCH_LIST_FAILURE,
      payload: error
    });
  }
};
const stateSelector = state => state[moduleName];
export const isLoadingSelector = createSelector(
  stateSelector,
  state => state.isLoading
);

export const errorMessageSelector = createSelector(
  stateSelector,
  state => state.error && state.error.message
);

const getId = () => `${new Date().getTime()}-${Math.random()}`;

//default state
export const defaultState = {
  isLoading: false,
  filter: "ALL", // "ALL", "ACTIVE", "DONE"
  newItemText: "some",
  error: null,
  list: [
    {
      id: getId().toString(),
      text: "buy milk1",
      isDone: false
    },
    {
      id: getId().toString(),
      text: "buy meat1",
      isDone: true
    }
  ]
};

//reducer
export default function(state = defaultState, action) {
  if (action.type === FETCH_LIST_REQUEST) {
    return {
      ...state,
      error: null,
      isLoading: true,
      list: []
    };
  }
  if (action.type === FETCH_LIST_SUCCESS) {
    return {
      ...state,
      list: action.payload,
      isLoading: false,
      filter: "ALL"
    };
  }
  if (action.type === FETCH_LIST_FAILURE) {
    return {
      ...state,
      error: action.payload,
      isLoading: true
    };
  }
  if (action.type === CHANGE_NEW_ITEM_TEXT) {
    return {
      ...state,
      newItemText: action.payload
    };
  }

  if (action.type === SAVE_ITEM_REQUEST) {
    return {
      ...state,
      newItemText: ""
    };
  }
  if (action.type === SAVE_ITEM_SUCCESS) {
    return {
      ...state,
      list: [...state.list, action.payload]
    };
  }

  // if (action.type === ADD_NEW_ITEM) {
  //     return {
  //         ...state,
  //         newItemText: "",
  //         list: [
  //             ...state.list,
  //             {
  //                 id: getId().toString(),
  //                 text: state.newItemText,
  //                 isDone: false
  //             }
  //         ]
  //     };
  // }
  if (action.type === HANDLE_IS_DONE) {
    return {
      ...state,
      list: state.list.map(el => {
        if (el.id === action.payload.itemId) {
          return {
            ...el,
            isDone: action.payload.isDone
          };
        }
        return el;
      })
    };
  }
  if (action.type === CHANGE_TEXT) {
    return {
      ...state,
      list: state.list.map(el => {
        if (el.id === action.payload.itemId) {
          return {
            ...el,
            text: action.payload.text
          };
        }
        return el;
      })
    };
  }
  if (action.type === "SET_FILTER") {
    return {
      ...state,
      filter: action.payload
    };
  }
  if (action.type === DELETE_ITEM_SUCCESS) {
    return {
      ...state,
      list: state.list.filter(item => item.id !== action.payload)
    };
  }

  return state;
}

export function filterTodos(list, filter) {
  if (filter === "ACTIVE") {
    return list.filter(item => !item.isDone);
  }
  if (filter === "DONE") {
    return list.filter(item => item.isDone);
  }

  return list;
}
