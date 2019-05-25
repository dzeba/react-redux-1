/**
 * Constants
 */
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

/**
 * Actions:
 */
export function increase(number = 1) {
  return {
    type: INCREASE,
    payload: number
  };
}

export function decrease(number = 1) {
  return {
    type: DECREASE,
    payload: number
  };
}

/**
 * Reducer:
 */

const defaultState = {
  count: 0
};

export default function counterReducer(state = defaultState, action) {
  if (action.type === INCREASE) {
    return {
      ...state,
      count: state.count + action.payload
    };
  } else if (action.type === DECREASE) {
    return {
      ...state,
      count: state.count - action.payload
    };
  }
  return state;
}
