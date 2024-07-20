import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import todoReducer from "./reducers.js";
import userReducer from "./user-reducer.jsx";

const RootReducer = combineReducers({
  todoReducer,
  userReducer
})

const store = legacy_createStore(RootReducer, applyMiddleware(thunk));

export default store;