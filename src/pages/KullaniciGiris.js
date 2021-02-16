import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/girisAction";
import ReCAPTCHA from "react-google-recaptcha";
import { Alert } from "reactstrap";

function KullaniciGiris(props) {
  const [eposta, setEposta] = useState();
  const [parola, setParola] = useState();
  const [error, setError] = useState();
  const [capca, setCapca] = useState(false);
  const key = "6LdQt1YaAAAAADLbFvyIB7HpljYQfTpRCLyjojA_";

  useEffect(() => {
    setError(props.auth.hataGiris);
  }, [props.auth.hataGiris]);

  const onClickLogin = async (event) => {
    event.preventDefault();
    const loginModel = {
      eposta,
      parola,
    };
    await props.loginUser(loginModel);
  };
  function onChange(value) {
    if (value) {
      setCapca(true);
    }
  }

  const buttonEnabled = eposta && parola && capca;
  return (
    <div className="container ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form>
            <h1 className="text-center">Giriş</h1>
            <Input
              label="E-Posta"
              name="eposta"
              onChange={(e) => setEposta(e.target.value)}
            />
            <Input
              label="Şifre"
              name="parola"
              type="password"
              onChange={(e) => setParola(e.target.value)}
            />
            <div className="">
              <ReCAPTCHA sitekey={key} onChange={onChange} theme="dark" />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            <div className="text-center">
              <button
                className="btn btn-primary mt-2"
                disabled={!buttonEnabled}
                onClick={(e) => onClickLogin(e)}
              >
                Giriş
              </button>
            </div>
          </form>
          <Alert color="danger" className="m-5">Kullanıcı Adı:admin, Parola:12345678</Alert>
        </div>
       
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(KullaniciGiris);
