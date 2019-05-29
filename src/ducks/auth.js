const appName = "rr2";
export const moduleName = "auth";

/**
 * Constants
 */
const LOGIN_REQUEST = `${appName}/${moduleName}/LOGIN/REQUEST`;
const LOGIN_SUCCESS = `${appName}/${moduleName}/LOGIN/SUCCESS`;
const LOGIN_FAILURE = `${appName}/${moduleName}/LOGIN/FAILURE`;

export const login = (userLogin, password) => async (
  dispatch,
  _getState,
  { api }
) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    await api.auth.login(userLogin, password);

    dispatch({
      type: LOGIN_SUCCESS
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE });
  }
};

// todo logout

// todo save in store that logged in

const defaultState = {};

export default function(state = defaultState, action) {
  return state;
}
