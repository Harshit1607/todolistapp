import { legacy_createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import todoReducer from "./reducers.js";

const store = legacy_createStore(todoReducer, applyMiddleware(thunk));

export default store;