import React from "react";
import Dashboard from "./root/Dashboard";
import KullaniciGiris from "./pages/KullaniciGiris";
import KullaniciKayit from "./pages/KullaniciKayit";
import TicketDetay from "./pages/TicketDetay";
import { connect } from "react-redux";
import history from "./utils/history";
import TicketOlustur from "./pages/TicketOlustur";

import { Redirect, Route, Switch, Router } from "react-router-dom";
import Navbar from "./components/Navbar";

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>
        <Router history={history}>
          <Navbar />
          <Switch>
            {isAuthenticated && (
              <>
                <Route exact path="/Dashboard" component={Dashboard} />
                <Route path="/ticketOlustur" component={TicketOlustur} />
                <Route path="/detay/:id" component={TicketDetay} />
                <Redirect to="/Dashboard" />
              </>
            )}
            {!isAuthenticated && (
              <>
                <Route path="/kullanicigiris" component={KullaniciGiris} />
                <Route path="/kullanicikayit" component={KullaniciKayit} />
              </>
            )}
             <Redirect to="/kullanicigiris" />
          </Switch>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, null)(App);
