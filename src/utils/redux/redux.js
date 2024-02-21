import { configureStore, Tuple } from "@reduxjs/toolkit";
import axios from "axios";
import { thunk } from "redux-thunk";
import { todoSlice } from "../TodoReducer/TodoReducer";

const apiMiddleware = (store) => (next) => (action) => {
  if (action.type === "apiCall") {
    const { url, method, data, onSuccess } = action.payload;
    axios({
      baseURL: "http://localhost:3001",
      url,
      method,
      data
    }).then((res) => {
      store.dispatch(onSuccess(res.data));
    });
  } else {
    next(action);
  }
};

export const store = configureStore({
  reducer: todoSlice.reducer,
  middleware: () => new Tuple(apiMiddleware)
});
