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
import API from '../utils/API';

class ControlPanel extends Component {
  state = {
    data: [],
    deleting: [],
    error: null,
    status: null
  };

  componentWillMount() {
    this.getUserInstances();
  }

  getUserInstances() {
    API.getInstanceByUser()
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  }

  handleDelete = event => {
    const instanceId = event.target.id;
    this.setState({ deleting: [...instanceId] });
    API.deleteInstance(instanceId)
      .then(result => {
        this.getUserInstances();
        const array = [...this.state.deleting];
        const index = array.indexOf(instanceId);
        array.splice(index, 1);
        this.setState({ deleting: array });
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
        <List.Item key={index}>
          <List.Content
            id={element}
            onClick={this.handleDelete}
            floated="right"
          >
            <Button
              disabled={this.state.deleting.includes(element) ? true : false}
              onClick={this.handleDelete}
              id={element}
            >
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
          My Uploads
          <Header.Subheader>
            Manage your previously uploaded files.
          </Header.Subheader>
        </Header>
        {this.state.error ? (
          <Message>An error has occured, please try again later.</Message>
        ) : (
          <div />
        )}

        {this.state.data.length > 0 ? (
          <List celled size={'huge'}>
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
