// reducers.js
import { combineReducers } from "redux";
import { POPULATE_POSTS } from "./actions";

const initialState = {
  posts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  rootReducer,
});
