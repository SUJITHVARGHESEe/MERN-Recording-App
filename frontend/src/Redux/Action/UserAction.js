import axios from "axios";
import { getError } from "../../utils";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const signup = (name, email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });
    const { data } = await axios.post("/api/user/signup", {
      name,
      email,
      password,
    });
    console.log(name, email);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: { token: data.token, user: data.user },
    });
    localStorage.setItem("user", JSON.stringify(getState().user.user)); // Store user data
  } catch (error) {
    throw new Error(getError(error));
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post("/api/user/login", {
      email,
      password,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: data.token, user: data.user },
    });
    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    throw new Error(getError(error));
  }
};
export const logout = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/logout");
    dispatch({ type: LOGOUT_SUCCESS });
    localStorage.removeItem("user");
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
  }
};
