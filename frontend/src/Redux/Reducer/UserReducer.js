import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../Action/UserAction";

const initialState = {
  token: null,
  loading: false,
  error: null,
  user: null,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: false };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, token: null, user: null };
    default:
      return state;
  }
};

export default signupReducer;
