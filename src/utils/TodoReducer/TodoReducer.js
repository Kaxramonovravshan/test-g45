import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "users",
  initialState: {
    users: [],
    todos: [],
    obj: { username: "", age: "" },
    currentUser: ""
  },
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
      state.currentUser = "";
    },
    getTodos: (state, action) => {
      state.todos = action.payload;
    },
    getName: (state, action) => {
      state.obj = { ...state.obj, username: action.payload };
    },
    getAge: (state, action) => {
      state.obj = { ...state.obj, age: action.payload };
    },
    editUser: (state, action) => {
      state.currentUser = action.payload.id;
      state.obj = action.payload;
    }
  }
});

function loadUsers() {
  return {
    type: "apiCall",
    payload: {
      method: "GET",
      path: "users",
      onSuccess: slice.actions.getUsers
    }
  };
}

function loadTodos() {
  return {
    type: "apiCall",
    payload: {
      method: "GET",
      path: "todos",
      onSuccess: slice.actions.getTodos
    }
  };
}

function saveUsers(data) {
  return {
    type: "apiCall",
    payload: {
      method: "POST",
      path: "users",
      data,
      onSuccess: loadUsers
    }
  };
}

function deleteUser(id) {
  return {
    type: "apiCall",
    payload: {
      method: "DELETE",
      path: "users",
      id,
      onSuccess: loadUsers
    }
  };
}

export const actions = {
  ...slice.actions,
  loadUsers,
  saveUsers,
  deleteUser,
  loadTodos
};

export const todoSlice = slice;
