import React, { Component } from 'react';
import {
  Container,
  Icon,
  Header,
  List,
  Button,
  Message
} from 'semantic-ui-react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AdSets from '../components/AdSets';
import API from '../utils/API';

class ControlPanel extends Component {
  state = {
    data: [],
    error: null
  };

  componentDidMount() {
    this.getUserInstances();
  }

  getUserInstances() {
    API.getInstanceByUser()
      .then(res => {
        console.log(res);
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  }

  handleDelete = event => {
    const instanceId = event.target.id;
    API.deleteInstance(instanceId)
      .then(result => {
        this.getUserInstances();
      })
      .catch(error =>
        this.setState({
          error
        })
      );
  };

  renderInstances(data) {
    return data.map((element, index) => {
      return (
        <List.Item key={index} verticalAlign="middle">
          <List.Content
            id={element}
            onClick={this.handleDelete}
            floated="right"
          >
            <Button onClick={this.handleDelete} id={element}>
              <Icon id={element} onClick={this.handleDelete} name="trash" />
            </Button>
          </List.Content>
          <List.Content>
            <Link to={`/a/${element}`}>{element} </Link>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <Container style={{ padding: '25px' }}>
        <Header as="h2" icon textAlign="center">
          <Icon name="settings" />
          Account Settings
          <Header.Subheader>
            Manage your previous uploaded files.
          </Header.Subheader>
        </Header>
        {this.state.error ? (
          <Message>An error has occured, please try again later.</Message>
        ) : (
          <div />
        )}

        {this.state.data.length > 0 ? (
          <List celled verticalAlign="middle" size={'huge'}>
            {this.renderInstances(this.state.data)}
          </List>
        ) : (
          <Header textAlign="center">
            Nothing here! Upload a file to get started
          </Header>
        )}
      </Container>
    );
  }
}

export default ControlPanel;
