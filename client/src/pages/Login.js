import React, { Component } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import { userActions } from '../_actions';

import config from '../utils/config.json';

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    // this.state = {
    //   username: '',
    //   password: '',
    //   submitted: false
    // };
  }

  facebookResponse = response => {
    const { dispatch } = this.props;
    console.log(response.id);
    dispatch(userActions.login(response));
  };

  onFailure = error => {
    this.setState({ error });
  };

  render() {
    return (
      <div className="login-form">
        <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <FacebookLogin
                  appId={config.FACEBOOK_APP_ID}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={this.facebookResponse}
                />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login };
