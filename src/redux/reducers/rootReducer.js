import { combineReducers } from "redux";
import { toDoReducer } from "./toDoReducer";

const rootReducer = combineReducers({
  toDos: toDoReducer,
  // Add other reducers here
});

export default rootReducer;
