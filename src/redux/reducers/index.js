import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import ticketReducer from "./ticketReducer";

const rootReducer = combineReducers({
  auth: loginReducer,
  ticket: ticketReducer,
});

export default rootReducer;
