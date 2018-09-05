import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Menu, Dropdown, Icon } from 'semantic-ui-react';

class MenuBar extends React.Component {
  render() {
    return (
      <Menu style={{ marginBottom: '0px' }}>
        <Link to="/">
          <Menu.Item>
            <Icon name="home" size="large" />
          </Menu.Item>
        </Link>

        {this.props.user ? (
          <Menu.Menu position="right">
            <Link to="/upload">
              <Menu.Item>
                <Button primary>Upload a File</Button>
              </Menu.Item>
            </Link>
            <Menu.Item>
              <Dropdown text="Profile">
                <Dropdown.Menu>
                  <Link to="/control">
                    <Dropdown.Item>Settings</Dropdown.Item>
                  </Link>
                  <Link to="/login">
                    <Dropdown.Item>Logout</Dropdown.Item>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Link to="/login">
              <Menu.Item>
                <Button>Log-in</Button>
              </Menu.Item>
            </Link>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;

  return {
    user
  };
}

const connectedMenuBar = connect(mapStateToProps)(MenuBar);
export { connectedMenuBar as MenuBar };
