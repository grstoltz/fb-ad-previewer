import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import { MenuBar } from './components/MenuBar';
import PrivateRoute from './components/PrivateRoute';

import { Upload } from './pages/Upload';
import ControlPanel from './pages/ControlPanel';
import Main from './pages/Main';
import { Login } from './pages/Login';
import Home from './pages/Home';

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
    console.log(user);
    return (
      <Router history={history} r>
        <div>
          <MenuBar isLoggedIn={user} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/control" component={ControlPanel} />
          <PrivateRoute path="/upload" component={Upload} />
          <PrivateRoute exact path="/a/:id" component={Main} />
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
