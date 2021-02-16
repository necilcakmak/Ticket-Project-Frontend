import React, { Component } from "react";
import Input from "../components/Input";
import { kayit } from "../api/apiCalls";
import history from "../utils/history";

class KullaniciKayit extends Component {
  state = {
    adSoyad: null,
    parola: null,
    parolaTekrar: null,
    eposta: null,
    telNo: null,
    errors: {},
    pendingApiCall: false,
  };
  onChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    if (name === "parola" || name === "parolaTekrar") {
      if (name === "parola" && value !== this.state.parolaTekrar) {
        errors.parolaTekrar = "Şifreler Eşleşmiyor";
      } else if (name === "parolaTekrar" && value !== this.state.parola) {
        errors.parolaTekrar = "Şifreler Eşleşmiyor";
      } else {
        errors.parolaTekrar = undefined;
      }
    }
    this.setState({
      [name]: value,
      errors,
    });
  };
  onClickKayit = async (event) => {
    event.preventDefault();
    const { adSoyad, parola, eposta, telNo } = this.state;
    const body = {
      adSoyad,
      parola,
      eposta,
      telNo,
    };
    this.setState({
      pendingApiCall: true,
    });
    try {
      const response = await kayit(body);
      history.push("/kullanicigiris");
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }
    this.setState({ pendingApiCall: false });
  };
  render() {
    const { pendingApiCall, errors } = this.state;
    const { adSoyad, parola, eposta, telNo, parolaTekrar } = errors;
    return (
      <div className="container">
         <div class="row">
      <div class="col-md-6 offset-md-3">
        <form>
          <h1 className="text-center">Kayıt Ol</h1>
          <Input
            label="Ad Soyad"
            name="adSoyad"
            error={adSoyad}
            onChange={this.onChange}
          />
          <Input
            label="Şifre"
            name="parola"
            type="password"
            error={parola}
            onChange={this.onChange}
          />
          <Input
            label="Şifre Tekrar"
            name="parolaTekrar"
            type="password"
            error={parolaTekrar}
            onChange={this.onChange}
          />
          <Input
            label="E-mail"
            name="eposta"
            error={eposta}
            onChange={this.onChange}
          />
          <Input
            label="Telefon Numarası"
            name="telNo"
            error={telNo}
            onChange={this.onChange}
          />
          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={pendingApiCall || parolaTekrar !== undefined}
              onClick={this.onClickKayit}
            >
              {" "}
              {pendingApiCall && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Kayıt Ol
            </button>
          </div>
        </form>
        </div>
        </div>
      </div>
    );
  }
}

export default KullaniciKayit;
