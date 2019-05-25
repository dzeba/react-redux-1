import { createSelector } from "reselect";

const appName = "rr2";
const moduleName = "products";
const prefix = `${appName}/${moduleName}`;
const FETCH_LIST_REQUEST = `${prefix}/FETCH_LIST_REQUEST`;
const FETCH_LIST_SUCCESS = `${prefix}/FETCH_LIST_SUCCESS`;
const FETCH_LIST_FAILURE = `${prefix}/FETCH_LIST_FAILURE`;

const FETCH_ONE_REQUEST = `${prefix}/FETCH_ONE_REQUEST`;
const FETCH_ONE_SUCCESS = `${prefix}/FETCH_ONE_SUCCESS`;
const FETCH_ONE_FAILURE = `${prefix}/FETCH_ONE_FAILURE`;

const SAVE_NEW_REQUEST = `${prefix}/SAVE_NEW_REQUEST`;
const SAVE_NEW_SUCCESS = `${prefix}/SAVE_NEW_SUCCESS`;
const SAVE_NEW_FAILURE = `${prefix}/SAVE_NEW_FAILURE`;

const SAVE_REQUEST = `${prefix}/SAVE_REQUEST`;
const SAVE_SUCCESS = `${prefix}/SAVE_SUCCESS`;
const SAVE_FAILURE = `${prefix}/SAVE_FAILURE`;

const DELETE_ITEM_REQUEST = `${prefix}/DELETE_ITEM_REQUEST`;
const DELETE_ITEM_SUCCESS = `${prefix}/DELETE_ITEM_SUCCESS`;
const DELETE_ITEM_FAILURE = `${prefix}/DELETE_ITEM_FAILURE`;

export const fetchProducts = page => async (dispatch, _getState, { api }) => {
  dispatch({
    type: FETCH_LIST_REQUEST
  });

  try {
    const data = await api.products.getAll(page);

    dispatch({
      type: FETCH_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_LIST_FAILURE,
      payload: error
    });
  }
};
export const fetchProduct = id => async (dispatch, getState, { api }) => {
  dispatch({
    type: FETCH_ONE_REQUEST
  });
  try {
    const data = await api.products.getOne(id);
    dispatch({
      type: FETCH_ONE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_ONE_FAILURE,
      payload: error
    });
  }
};

export const saveNewProduct = newProduct => async (
  dispatch,
  _getState,
  { api }
) => {
  dispatch({
    type: SAVE_NEW_REQUEST
  });

  try {
    const product = await api.products.saveNew(newProduct);

    dispatch({
      type: SAVE_NEW_SUCCESS,
      payload: product
    });

    return product;
  } catch (error) {
    dispatch({
      type: SAVE_NEW_FAILURE,
      payload: error
    });
  }
};

export const saveProduct = newProduct => async (
  dispatch,
  _getState,
  { api }
) => {
  dispatch({
    type: SAVE_REQUEST
  });

  try {
    const product = await api.products.save(newProduct);

    dispatch({
      type: SAVE_SUCCESS,
      payload: product
    });

    return product;
  } catch (error) {
    dispatch({
      type: SAVE_FAILURE,
      payload: error
    });
  }
};

export const deleteProduct = itemId => async (dispatch, getState, { api }) => {
  dispatch({ type: DELETE_ITEM_REQUEST, payload: itemId });

  try {
    const data = await api.products.deleteProduct(itemId);
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: itemId });
  } catch (error) {
    dispatch({
      type: DELETE_ITEM_FAILURE,
      payload: error
    });
  }
};

const defaultState = {
  isLoading: false,
  list: [],

  total: 1,
  page: 1,
  limit: 1,

  one: null
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload.list,
        total: action.payload.total,
        page: action.payload.page,
        limit: action.payload.limit
      };
    case FETCH_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ONE_SUCCESS:
      return {
        ...state,
        one: action.payload,
        isLoading: false
      };
    case FETCH_ONE_REQUEST:
      return {
        ...state,
        one: null,
        isLoading: true
      };

    default:
      return state;
  }
}
export const stateSelector = state => state[moduleName];
export const productsSelector = createSelector(
  stateSelector,
  state => state.list
);
export const isLoadingSelector = createSelector(
  stateSelector,
  state => state.isLoading
);
export const totalPagesSelector = createSelector(
  stateSelector,
  state => Math.ceil(state.total / state.limit)
);
