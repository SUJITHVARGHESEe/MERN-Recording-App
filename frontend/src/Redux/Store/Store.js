import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signupReducer from "../Reducer/UserReducer";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const rootReducer = combineReducers({
  user: signupReducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    user: { user: userFromStorage },
  },
});

export default store;
