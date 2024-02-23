import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions } from "./utils/TodoReducer/TodoReducer";

const App = (props) => {
  useEffect(() => {
    props.loadUsers();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          console.log(props);
        }}
      >
        test
      </button>

      <button onClick={props.loadTodos}>getTodos</button>

      <div className="card p-3 w-25">
        <input
          value={props.obj.username}
          className="form-control mb-2"
          onChange={(e) => props.getName(e.target.value)}
          type="text"
        />
        <input
          value={props.obj.age}
          className="form-control mb-2"
          onChange={(e) => props.getAge(e.target.value)}
          type="text"
        />
        <button
          onClick={() => props.saveUsers(props.obj)}
          className="btn btn-dark"
        >
          Save
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((itm) => (
            <tr key={itm.id}>
              <td>{itm.username}</td>
              <td>{itm.age}</td>
              <td>
                <button
                  onClick={() => props.deleteUser(itm.id)}
                  className="btn btn-danger"
                >
                  X
                </button>
                <button
                  onClick={() => props.editUser(itm)}
                  className="btn btn-warning"
                >
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default connect((state) => ({ ...state }), actions)(App);
