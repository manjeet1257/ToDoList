// actions.js
import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  GET_TODO_REQUEST,
  TOGGLE_TODO_REQUEST,
  ADD_TODO_REQUEST,
} from "./todoActionTypes";

export const getTodo = () => {
  // console.log("action");
  return {
    type: GET_TODO_REQUEST,
  };
};

export const addTodo = (task, desc) => ({
  type: ADD_TODO_REQUEST,
  payload: { task, desc },
});

export const toggleTodo = (id, isCompleted) => {
  // console.log("toggleTodo action");
  return {
    type: TOGGLE_TODO_REQUEST,
    payload: { id, isCompleted },
  };
};

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id },
});
