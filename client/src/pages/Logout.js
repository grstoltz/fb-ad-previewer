import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Header, Container } from 'semantic-ui-react';

import { userActions } from '../_actions';

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch(userActions.logout());
  }

  render() {
    return (
      <Container>
        <Header>You are now being logged out...</Header>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { loggingOut } = state.authentication;
  return {
    loggingOut
  };
}

const connectedLogoutPage = connect(mapStateToProps)(Logout);
export { connectedLogoutPage as Logout };
