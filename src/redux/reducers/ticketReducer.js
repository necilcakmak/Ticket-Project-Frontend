import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function ticketReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TICKETLAR:
      return { ...state, ticketlar: action.payload };
      case actionTypes.DELETETICKET:
        return { ...state, ticketlar: state.ticketlar.filter(t=>t.id!==action.payload) };
    default:
      return state;
  }
}
