import React, { Component } from 'react';
import { Sidebar, Menu, Container, Header, Icon } from 'semantic-ui-react';
import AdSets from '../components/AdSets';
import API from '../utils/API';

class Main extends Component {
  state = {
    data: [],
    adSets: [],
    activeItem: '',
    processing: null
  };

  componentDidMount() {
    this.getInstance();
  }

  getInstance() {
    console.log('function called');
    API.getInstance(this.props.match.params.id)
      .then(res => {
        if (!res.data.processing) {
          this.getContent();
          this.setState({ processing: res.data.processing });
        } else {
          // Checks the database every 10 seconds while on the page to see if it has processed
          this.setState({ processing: true });
          setTimeout(this.getInstance(), 10000);
        }
      })
      .catch(err => console.log(err));
  }

  getContent() {
    API.getContent(this.props.match.params.id)
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
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'table'
        }}
      >
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
          {this.state.processing ? (
            <Header style={{ marginTop: '30%' }} as="h2" textAlign="center">
              Processing...
              <Header style={{ marginTop: '15px' }} as="h5" textAlign="center">
                Check back in a few minutes or just wait here.
              </Header>
            </Header>
          ) : this.state.adSets.length > 0 ? (
            <AdSets
              campaign={this.state.activeItem}
              adSets={this.state.adSets}
            />
          ) : (
            <Header style={{ marginTop: '40%' }} as="h2" textAlign="center">
              <Icon name="arrow left" /> Select a campaign to begin.
            </Header>
          )}
        </Container>
      </div>
    );
  }
}

export default Main;
