import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./Reducers";

export default function configureStore(initialState = {}) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
}
