import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(), // You can add middleware here if needed
  ),
);

export default store;
