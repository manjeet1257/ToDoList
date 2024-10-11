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
    case TOGGLE_TODO:
      return setToggleTodo(state, action);
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

const setToggleTodo = (state, action) => {
  const tasks = state.tasks.map((task) => {
    if (task.id === action.payload.id) {
      return action.payload;
    }
    return task;
  });
  return {
    ...state,
    tasks,
  };
};

export { toDoReducer };
