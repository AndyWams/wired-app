import { SET_USER, USER_ACCOUNT_FAILURE, LOGOUT_USER } from "./authTypes";
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
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

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
export const getProfileFetch = () => async (dispatch) => {
  try {
    const response = await AuthService.userProfile();
    const data = response;
    if (data.message) {
      localStorage.removeItem("user");
      dispatch(authSuccess(data.user));
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(authFailure(message));
    return Promise.reject();
  }
};
