import * as actionTypes from "./actionTypes";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import history from '../../utils/history';

export const loginUser = (loginModel) => (dispatch) => {
  axios
    .post("/api/auth", loginModel)
    .then((res) => {
      history.push('/')
      // Gelen token'i kullanmak için değişken olarak saklıyoruz
      const { token } = res.data;
      const { kullanici } = res.data;
      // Token'i localStorage'da saklıyoruz
      localStorage.setItem("jwtToken", token);
      // Daha önce yazdığımız fonksiyon ile gelecek istekler için        kaydediyoruz
      setAuthToken(token);
      // Token'i Çözümlüyoruz
      const decoded = jwt_decode(token);
      // ve Çözümlediğimiz Token'i Reducer'a iletmesi için       setCurrentUser Action'una gönderiyoruz
      dispatch(setCurrentUser(kullanici));
    })
    .catch((err) => {dispatch(hata(err.response.data.message)) });
};

export const setCurrentUser = (decoded) => {
  return {
    type: actionTypes.KULLANICI_GIRIS,
    payload: decoded, 
  };
};
export const hata=(h)=>{
  return {
    type: actionTypes.HATA,
    payload: h, 
  };
}
export const cikis = () => {
  localStorage.removeItem("jwtToken");
  setAuthToken(null);
  
  return {
    type: actionTypes.KULLANICI_CIKIS,
  };
};
