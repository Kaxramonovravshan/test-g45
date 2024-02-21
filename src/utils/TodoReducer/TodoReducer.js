import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    todoObj: {
      name: "",
      desc: "",
      check: false,
      completed: false
    }
  },
  reducers: {
    saveName: (state, action) => {
      state.todoObj = { ...state.todoObj, name: action.payload };
    },
    saveDesc: (state, action) => {
      state.todoObj = { ...state.todoObj, desc: action.payload };
    },

    getTodos: (state, action) => {
      state.todos = action.payload;
    }
  }
});

function saveTodo(data) {
  return {
    type: "apiCall",
    payload: {
      url: "/todos",
      method: "POST",
      data,
      onSuccess: loadTodos
    }
  };
}

function loadTodos() {
  return {
    type: "apiCall",
    payload: {
      url: "/todos",
      method: "GET",
      onSuccess: slice.actions.getTodos
    }
  };
}

function deleteTodos(id) {
  return {
    type: "apiCall",
    payload: {
      url: "/todos/" + id,
      method: "DELETE",
      onSuccess: loadTodos
    }
  };
}

function changePending(itm) {
  return {
    type: "apiCall",
    payload: {
      url: "/todos/" + itm.id,
      method: "PATCH",
      data: { completed: !itm.completed },
      onSuccess: loadTodos
    }
  };
}

function deleteCompleted(todos) {
  const a = todos.filter((itm) => {
    if (!itm.completed) {
      return itm;
    }
  });

  return {
    type: "apiCall",
    payload: {
      url: "/",
      method: "PUT",
      data: { todos: a },
      onSuccess: loadTodos
    }
  };
}

export const actions = {
  ...slice.actions,
  saveTodo,
  loadTodos,
  changePending,
  deleteCompleted,
  deleteTodos
};

export const todoSlice = slice;
