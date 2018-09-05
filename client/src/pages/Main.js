import React, { Component } from 'react';
import { Sidebar, Menu, Container } from 'semantic-ui-react';
import AdSets from '../components/AdSets';
import API from '../utils/API';

class Main extends Component {
  state = {
    data: [],
    adSets: [],
    activeItem: ''
  };

  componentDidMount() {
    this.getInstance();
  }

  getInstance() {
    API.getInstance(this.props.match.params.id)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  }

  handleCampaignClick = (event, { name }) => {
    const idx = this.state.data.findIndex(
      element => element.campaignId === event.target.id
    );
    this.setState({
      adSets: this.state.data[idx].adSets,
      activeItem: name
    });
  };

  renderCampaigns(data) {
    return data.map((element, index) => {
      return (
        <Menu.Item
          as="a"
          name={element.campaignName}
          active={this.state.activeItem === element.campaignName}
          key={index}
          id={element.campaignId}
          onClick={this.handleCampaignClick}
        >
          {element.campaignName}
        </Menu.Item>
      );
    });
  }

  render() {
    return (
      <div style={{ position: 'absolute', height: '100%', width: '100%' }}>
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          inverted
          vertical
          visible
          direction="left"
          width="wide"
          style={{
            float: 'left',
            position: 'relative',
            height: '100%'
          }}
        >
          <Menu.Item as="h2" style={{ marginBottom: '0px' }}>
            Campaigns
          </Menu.Item>
          {this.renderCampaigns(this.state.data)}
        </Sidebar>
        <Container style={{ float: 'left', padding: '25px', width: '75%' }}>
          {this.state.adSets.length > 0 ? (
            <AdSets
              campaign={this.state.activeItem}
              adSets={this.state.adSets}
            />
          ) : (
            <div>Select a campaign to begin</div>
          )}
        </Container>
      </div>
    );
  }
}

export default Main;
