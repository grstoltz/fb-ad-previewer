import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import { MenuBar } from './components/MenuBar';
import PrivateRoute from './components/PrivateRoute';

import { Upload } from './pages/Upload';
import ControlPanel from './pages/ControlPanel';
import Main from './pages/Main';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
import Privacy from './pages/Privacy';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';

import { history } from './_helpers';
import { alertActions } from './_actions';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;

    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { user } = this.props;
    return (
      <Router history={history} r>
        <div>
          <MenuBar isLoggedIn={user} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/privacy-policy" component={Privacy} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <PrivateRoute path="/control" component={ControlPanel} />
            <PrivateRoute path="/upload" component={Upload} />
            <PrivateRoute exact path="/a/:id" component={Main} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert, authentication } = state;
  const { user } = authentication;
  console.log(user);
  return {
    alert,
    user
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
