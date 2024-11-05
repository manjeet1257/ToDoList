// sagas.js
import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  SET_TODO,
  ADD_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  TOGGLE_TODO_REQUEST,
  ADD_TODO_REQUEST,
  EDIT_TODO_REQUEST,
  GET_TODO_REQUEST,
  REMOVE_TODO_REQUEST,
} from "../actions/todoActionTypes";

const API_URL = "http://localhost:5000/api/Task"; // Replace with your actual API endpoint

function* getTodoSaga() {
  try {
    // console.log("gettodosaga");
    const token = localStorage.getItem("token");
    const response = yield call(fetch, `${API_URL}/GetAllTask`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      // Handle unauthorized access, e.g., dispatch a logout action or redirect
      console.error("Unauthorized or Forbidden request");
      yield put({ type: "UNAUTHORIZED_REQUEST" });
      return;
    }

    const todo = yield response.json();
    console.log(todo);
    //type is basically a action type
    yield put({ type: SET_TODO, payload: todo });
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

function* addTodoSaga(action) {
  try {
    const token = localStorage.getItem("token");
    // console.log(action);
    const response = yield call(fetch, `${API_URL}/AddTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Title: action.payload.task,
        Description: action.payload.desc,
        DueDate: action.payload.duedate,
      }),
    });
    const todo = yield response.json();
    yield put({ type: ADD_TODO, payload: todo });
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

function* editTodoSaga(action) {
  try {
    const token = localStorage.getItem("token");
    // console.log(action);
    const response = yield call(fetch, `${API_URL}/UpdateTask`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Id: action.payload.id,
        Title: action.payload.task,
        Description: action.payload.desc,
        DueDate: action.payload.duedate,
        isCompleted: action.payload.isCompleted,
      }),
    });
    const todo = yield response.json();
    yield put({ type: EDIT_TODO, payload: todo });
  } catch (error) {
    console.error("Error updating todo:", error);
  }
}

function* toggleTodoSaga(action) {
  try {
    // console.log("toggleTodo saga");
    const token = localStorage.getItem("token");
    const response = yield call(
      fetch,
      `${API_URL}/UpdateTask/${action.payload.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify([
          {
            op: "replace",
            path: "/isCompleted",
            value: action.payload.isCompleted,
          },
        ]),
      }
    );
    if (response.ok) {
      const data = yield response.json();
      // console.log(data);
      yield put({ type: TOGGLE_TODO, payload: data });
    }
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
}

function* removeTodoSaga(action) {
  try {
    const token = localStorage.getItem("token");
    // console.log(action);
    const response = yield call(
      fetch,
      `${API_URL}/DeleteTask/${action.payload.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const todo = yield response.json();
    yield put({ type: REMOVE_TODO, payload: todo });
  } catch (error) {
    console.error("Error updating todo:", error);
  }
}

function* watchAddTodo() {
  yield takeEvery(ADD_TODO_REQUEST, addTodoSaga);
}

function* watchEditTodo() {
  yield takeEvery(EDIT_TODO_REQUEST, editTodoSaga);
}

function* watchToggleTodo() {
  // console.log("watchToggleTodo");
  yield takeEvery(TOGGLE_TODO_REQUEST, toggleTodoSaga);
}

function* watchRemoveTodo() {
  yield takeEvery(REMOVE_TODO_REQUEST, removeTodoSaga);
}

function* watchGetTodo() {
  yield takeEvery(GET_TODO_REQUEST, getTodoSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetTodo(),
    watchAddTodo(),
    watchEditTodo(),
    watchToggleTodo(),
    watchRemoveTodo(),
  ]);
}
