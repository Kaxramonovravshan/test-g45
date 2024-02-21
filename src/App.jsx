import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { firestore } from "./utils/firebae.config";

const App = () => {
  const [users, setUsers] = useState([]);
  const [obj, setObj] = useState({ username: "", age: "" });
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    setLoading(true);
    const refCollection = collection(firestore, "users");

    getDocs(refCollection).then((res) => {
      let a = res.docs.map((itm) => {
        return { ...itm.data(), id: itm.id };
      });

      setUsers(a);
      setLoading(false);
    });
  }

  function save() {
    setLoading(true);
    const refCollection = collection(firestore, "users");

    if (currentItem === "") {
      addDoc(refCollection, obj).then((res) => {
        getUsers();
      });
    } else {
      const oneDoc = doc(refCollection, currentItem);
      updateDoc(oneDoc, obj).then((res) => {
        getUsers();
        setCurrentItem("");
      });
    }
    setObj({ username: "", age: "" });
  }

  function deleteItem(id) {
    const refCollection = collection(firestore, "users");
    const oneDoc = doc(refCollection, id);
    deleteDoc(oneDoc).then((res) => {
      getUsers();
    });
  }

  function editItem(itm) {
    setCurrentItem(itm.id);
    delete itm.id;
    setObj(itm);
  }

  return (
    <div>
      <button
        onClick={() => {
          console.log(obj);
        }}
      >
        test
      </button>

      <div className="card my-box p-3 w-25 mx-auto my-4">
        <input
          value={obj.username}
          onChange={(e) => setObj({ ...obj, username: e.target.value })}
          className="form-control mb-2"
          placeholder="username..."
          type="text"
        />
        <input
          value={obj.age}
          onChange={(e) => setObj({ ...obj, age: e.target.value })}
          className="form-control mb-2"
          placeholder="age..."
          type="text"
        />
        <button onClick={save} className="btn btn-dark">
          save
        </button>
      </div>

      {!loading ? (
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((itm) => {
              return (
                <tr key={itm.id}>
                  <td>{itm.username}</td>
                  <td>{itm.age}</td>
                  <td>
                    <button
                      onClick={() => deleteItem(itm.id)}
                      className="btn btn-danger"
                    >
                      X
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => editItem(itm)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <button
          style={{ height: "60px" }}
          className="btn btn-primary mx-auto d-block w-25"
          type="button"
          disabled
        >
          <span
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
          <span role="status">Loading...</span>
        </button>
      )}
    </div>
  );
};

export default App;
