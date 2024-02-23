import { configureStore, Tuple } from "@reduxjs/toolkit";
import { todoSlice } from "../TodoReducer/TodoReducer";
import apiMiddleware from "./apiMiddleware";



export const store = configureStore({
  reducer: todoSlice.reducer,
  middleware: () => new Tuple(apiMiddleware)
});
