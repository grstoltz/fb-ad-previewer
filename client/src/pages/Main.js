import React, { Component } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import API from '../utils/API';

class Main extends Component {
  state = {
    data: {
      campaigns: []
    }
  };

  componentDidMount() {
    this.getInstance();
  }

  getInstance() {
    API.getInstance(this.props.match.params.id)
      .then(res => {
        this.setState({ data: res.data[0] });
      })
      .catch(err => console.log(err));
  }

  renderCampaigns(data) {
    return data.campaigns.map(element => {
      return <Menu.Item as="a">{element.campaignName}</Menu.Item>;
    });
  }

  render() {
    return (
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="wide"
      >
        <Menu.Item as="h2">Campaigns</Menu.Item>
        {this.renderCampaigns(this.state.data)}
      </Sidebar>
    );
  }
}

export default Main;
