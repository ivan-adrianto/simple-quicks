import { combineReducers } from "redux";
import { chatReducer } from "./chatReducer";
import { commonReducer } from "./commonReducer";

export const rootReducer = combineReducers({
  chat: chatReducer,
  common: commonReducer,
});
