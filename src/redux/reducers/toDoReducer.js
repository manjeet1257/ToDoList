import { act } from "react";
import { addTodo, removeTodo } from "../actions/todoAction";
import {
  SET_TODO,
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  EDIT_TODO,
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
    case EDIT_TODO:
      return setEditTodo(state, action);
    case ADD_TODO:
      return addTodos(state, action);
    case REMOVE_TODO:
      return setRemoveTodo(state, action);
    default:
      return state;
  }
};

function setTodos(state, action) {
  // console.log({ state });
  // console.log({ action });
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
    tasks: [...tasks],
  };
};

const setRemoveTodo = (state, action) => {
  const taskIndex = state.tasks.findIndex(
    (ele) => ele.id === action.payload.id
  );
  console.log(taskIndex);
  state.tasks.splice(taskIndex, 1);
  return {
    ...state,
    tasks: [...state.tasks],
  };
};

const setEditTodo = (state, action) => {
  const tasks = state.tasks.map((task) => {
    if (task.id === action.payload.id) {
      return action.payload;
    }
    return task;
  });
  console.log(tasks);
  return {
    ...state,
    tasks: [...tasks],
  };
};

const addTodos = (state, action) => {
  const tasks = [...state.tasks, action.payload]; //,state.tasks.push(action.payload);
  // console.log(tasks);
  return {
    ...state,
    tasks,
  };
};

export { toDoReducer };
