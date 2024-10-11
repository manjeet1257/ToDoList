// sagas.js
import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  GET_TODO_REQUEST,
  SET_TODO,
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  TOGGLE_TODO_REQUEST,
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
    //type is basically a action type
    yield put({ type: SET_TODO, payload: todo });
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
  // console.log("watchToggleTodo");
  yield takeEvery(TOGGLE_TODO_REQUEST, toggleTodoSaga);
}

function* watchRemoveTodo() {
  yield takeEvery("REMOVE_TODO_REQUEST", removeTodoSaga);
}

function* watchGetTodo() {
  yield takeEvery(GET_TODO_REQUEST, getTodoSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetTodo(),
    watchAddTodo(),
    watchToggleTodo(),
    watchRemoveTodo(),
  ]);
}
