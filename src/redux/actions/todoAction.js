// actions.js
import {
  GET_TODO_REQUEST,
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
} from "./todoActionTypes";

export const getTodo = () => {
  console.log("action");
  return {
    type: GET_TODO_REQUEST,
  };
};

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id },
});
