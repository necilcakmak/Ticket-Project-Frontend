import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.KULLANICI_GIRIS:
      return {
        ...state,
        isAuthenticated: true,
        kullanici: action.payload,
      };

    case actionTypes.KULLANICI_CIKIS:
      return {
        ...state,
        isAuthenticated: false,
        kullanici: null,
        hataGiris:null,
        ticketlar:[]
      };
      case actionTypes.HATA:
        return {
          ...state,
          hataGiris:action.payload

        };
    default:
      return state;
  }
}
