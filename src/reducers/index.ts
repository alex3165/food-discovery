import { combineReducers } from "redux";

export interface AppState {
  venues: {};
}

const rootReducer = combineReducers({
  venues: (state: {} = {}) => state
});

export default rootReducer;
