import { combineReducers } from "redux";
import { toDoReducer } from "./toDo";

const rootReducer = combineReducers({
  toDos: toDoReducer,
  // Add other reducers here
});

export default rootReducer;
