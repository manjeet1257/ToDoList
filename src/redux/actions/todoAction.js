// actions.js
import {
  ADD_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  GET_TODO_REQUEST,
  TOGGLE_TODO_REQUEST,
  ADD_TODO_REQUEST,
  EDIT_TODO_REQUEST,
  REMOVE_TODO_REQUEST,
} from "./todoActionTypes";

export const getTodo = () => {
  // console.log("action");
  return {
    type: GET_TODO_REQUEST,
  };
};

export const addTodo = (task, desc, duedate) => ({
  type: ADD_TODO_REQUEST,
  payload: { task, desc, duedate },
});

export const editTodo = (id, task, desc, duedate, isCompleted) => {
  return {
    type: EDIT_TODO_REQUEST,
    payload: { id, task, desc, duedate, isCompleted },
  };
};

export const toggleTodo = (id, isCompleted) => {
  // console.log("toggleTodo action");
  return {
    type: TOGGLE_TODO_REQUEST,
    payload: { id, isCompleted },
  };
};

export const removeTodo = (id) => ({
  type: REMOVE_TODO_REQUEST,
  payload: { id },
});
