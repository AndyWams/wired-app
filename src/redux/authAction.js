import { SET_USER, USER_ACCOUNT_FAILURE } from "./authTypes";
import AuthService from "../services/auth.service";

export const authSuccess = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const authFailure = (error) => {
  return {
    type: USER_ACCOUNT_FAILURE,
    payload: error,
  };
};

export const register = (user) => async (dispatch) => {
  try {
    const response = await AuthService.register(user);
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch(authSuccess(response.data));
    return Promise.resolve();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(authFailure(message));
    return Promise.reject();
  }
};
export const login = (user) => async (dispatch) => {
  try {
    const response = await AuthService.login(user);
    localStorage.setItem("user", JSON.stringify(response));
    dispatch(authSuccess(response.data));
    return Promise.resolve();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(authFailure(message));
    return Promise.reject();
  }
};
export const getProfileFetch = () => {
  return (dispatch) => {
    const token = localStorage.user;
    if (token) {
      return fetch("http://localhost:5000/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message) {
            // An error will occur if the token is invalid.
            // If this happens, you may want to remove the invalid token.
            localStorage.removeItem("user");
          } else {
            dispatch(authSuccess(data.user));
          }
        });
    }
  };
};
