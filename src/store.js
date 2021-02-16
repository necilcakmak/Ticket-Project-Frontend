import { createStore } from "redux";
import rootReducer from "./redux/reducers/index";

const initialState = {};
// initialState olarak başlangıç State'i
const store = createStore(rootReducer, initialState);
export default store;
