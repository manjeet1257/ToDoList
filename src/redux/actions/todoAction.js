// actions.js
import {
  GET_TODO_REQUEST,
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  TOGGLE_TODO_REQUEST,
} from "./todoActionTypes";

export const getTodo = () => {
  // console.log("action");
  return {
    type: GET_TODO_REQUEST,
  };
};

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text },
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
