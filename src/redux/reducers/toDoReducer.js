import {
  SET_TODO,
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
} from "../actions/todoActionTypes";

const initState = {
  tasks: [],
};

const toDoReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TODO:
      return setTodos(state, action);
    default:
      return state;
  }
};

function setTodos(state, action) {
  return {
    ...state,
    tasks: action.payload,
  };
}

export { toDoReducer };
