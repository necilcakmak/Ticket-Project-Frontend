import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as api from "../../api/apiCalls";

export function getTickets() {
  return function (dispatch) {
    return api
      .getTickets()   
      .then((result) => dispatch(getTicketlar(result.data)));
  };
}
export function getTicketsById(id) {
  return function (dispatch) {
    return api
      .getTicketsById(id)   
      .then((result) => dispatch(getTicketlar(result.data)));
  };
}

export function getTicketlar(ticketlar) {
  return { type: actionTypes.TICKETLAR, payload: ticketlar };
}

export function deleteTicket(id){
  return function(dispatch){
    return api.deleteTicket(id).then(() => dispatch(deleteTick(id)));
  }
}

export function deleteTick(id) {
  return { type: actionTypes.DELETETICKET, payload: id };
}