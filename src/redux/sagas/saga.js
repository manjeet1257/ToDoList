// sagas.js
import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_TODO_REQUEST,
  SET_TODO,
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
} from "../actions/todoActionTypes";

const API_URL = "http://localhost:5000/api/task/GetAllTask"; // Replace with your actual API endpoint

function* getTodoSaga() {
  try {
    console.log("gettodosaga");
    const token = localStorage.getItem("token");
    const response = yield call(fetch, API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const todo = yield response.json();
    yield put({ type: SET_TODO, payload: todo, completed: false });
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

function* addTodoSaga(action) {
  try {
    const response = yield call(fetch, API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: action.payload.text }),
    });
    const todo = yield response.json();
    yield put({ type: ADD_TODO, payload: { ...todo, completed: false } });
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

function* toggleTodoSaga(action) {
  try {
    const response = yield call(fetch, `${API_URL}/${action.payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    });
    if (response.ok) {
      yield put({ type: TOGGLE_TODO, payload: { id: action.payload.id } });
    }
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
}

function* removeTodoSaga(action) {
  try {
    const response = yield call(fetch, `${API_URL}/${action.payload.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      yield put({ type: REMOVE_TODO, payload: { id: action.payload.id } });
    }
  } catch (error) {
    console.error("Error removing todo:", error);
  }
}

function* watchAddTodo() {
  yield takeEvery("ADD_TODO_REQUEST", addTodoSaga);
}

function* watchToggleTodo() {
  yield takeEvery("TOGGLE_TODO_REQUEST", toggleTodoSaga);
}

function* watchRemoveTodo() {
  yield takeEvery("REMOVE_TODO_REQUEST", removeTodoSaga);
}

function* watchGetTodo() {
  yield takeEvery(GET_TODO_REQUEST, getTodoSaga);
}

export default function* rootSaga() {
  yield watchGetTodo();
  yield watchAddTodo();
  yield watchToggleTodo();
  yield watchRemoveTodo();
}
