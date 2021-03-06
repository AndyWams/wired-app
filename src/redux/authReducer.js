import { SET_USER, USER_ACCOUNT_FAILURE } from "./authTypes";

const initialState = {
  loading: true,
  currentUser: {},
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: "",
      };
    case USER_ACCOUNT_FAILURE:
      return {
        loading: false,
        currentUser: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
