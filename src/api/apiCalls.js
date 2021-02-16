import axios from "axios";
import history from "../utils/history";

export const kayit = (body) => {
  
  return axios.post("/api/kayit", body);
};

export const getTickets = () => {
  return axios.get("/api/ticketlar");
};
export const getTicketsById = (id) => {
  return axios.get("/api/ticketlar/"+id);
};
export const getTicketById = (id) => {
  return axios.get("/api/ticket/"+id);
};

export const updateTicket = (body) => {
  
  return axios.post("/api/ticketOlustur", body).then((res) => {
    history.push('/Dashboard')});
};

export const deleteTicket = (id) => {
  
  return axios.delete("/ticketSil/"+id);
};
