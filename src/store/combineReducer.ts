import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../redux/authReducer";
import productsReducer from "../redux/productsReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  product: productsReducer,
});
