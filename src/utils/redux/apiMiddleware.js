import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../firebae.config";

const apiMiddleware = (store) => (next) => (action) => {
  if (action.type === "apiCall") {
    const { method, path, data, id, onSuccess } = action.payload;

    const refCollection = collection(firestore, path);

    if (method === "GET") {
      getDocs(refCollection).then((res) => {
        const a = res.docs.map((itm) => {
          return { ...itm.data(), id: itm.id };
        });
        store.dispatch(onSuccess(a));
      });
    } else if (method === "POST") {
      if (store.getState().currentUser === "") {
        addDoc(refCollection, data).then((res) => {
          store.dispatch(onSuccess());
        });
      } else {
        const oneDoc = doc(refCollection, store.getState().currentUser);
        updateDoc(oneDoc, data).then((res) => {
          store.dispatch(onSuccess());
        });
      }
    } else if (method === "DELETE") {
      const oneDoc = doc(refCollection, id);
      deleteDoc(oneDoc).then((res) => {
        store.dispatch(onSuccess());
      });
    }
  } else {
    next(action);
  }
};

export default apiMiddleware;
