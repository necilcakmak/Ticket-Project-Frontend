import React, { Component } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as girisAction from "../redux/actions/girisAction";

class Navbar extends Component {
  render() {
    const { kullanici, isAuthenticated } = this.props.auth;

    const { onCikis } = this.props.actions;
    let links = (
      <ul className="navbar-nav ml-auto">
        <li>
          <Link className="nav-link" to="/kullanicigiris">
            Giriş
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/kullanicikayit">
            Kayıt ol
          </Link>
        </li>
      </ul>
    );
    if (isAuthenticated) {
      const { adSoyad, rol } = kullanici;
      links = (
        <ul className="navbar-nav ml-auto">
          <li>
            <Link className="nav-link" to={"/Dashboard"}>
              {adSoyad} {rol === "ROLE_USER" ? "(USER)" : "(ADMİN)"}
            </Link>
          </li>
         {rol!=="ROLE_ADMIN" &&
          <li>
            <Link className="nav-link" to={"/ticketOlustur"}>
             Ticket Oluştur
            </Link>
          </li>
    }
          <li
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={onCikis}
          >
            Çıkış
          </li>
        </ul>
      );
    }
    return (
      <div className="shadov-sm bg-light mb-3">
        <nav className="navbar navbar-light  container navbar-expand">
          <Link className="navbar-brand" to="/Dashboard">
            <img src={logo} width="80" alt="Tein Logo" href="#/" />
          </Link>
          {links}
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      onCikis: bindActionCreators(girisAction.cikis, dispatch),
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
