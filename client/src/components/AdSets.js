import React, { Component } from 'react';
import { Accordion, Icon, Header, Divider } from 'semantic-ui-react';

class AdSets extends Component {
  state = { activeIndex: null };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  renderAdSets = () => {
    const { adSets } = this.props;
    const { activeIndex } = this.state;

    return adSets.map((adSet, masterIndex) => {
      return (
        <div key={masterIndex}>
          <Header>{this.props.campaign}</Header>
          <Accordion fluid styled style={{ marginBottom: '5%' }}>
            <Accordion.Title
              active={activeIndex === masterIndex}
              index={masterIndex}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              {adSet.adSetName}
            </Accordion.Title>
            {adSet.ads.map((ad, index) => {
              return (
                <Accordion.Content
                  key={index}
                  active={activeIndex === masterIndex}
                >
                  <p key={index}>Ad Name: {ad.adName}</p>
                  <img src={ad.imgPath} />
                  <Divider />
                </Accordion.Content>
              );
            })}
          </Accordion>
        </div>
      );
    });
  };

  render() {
    const { activeIndex } = this.state;
    return <div>{this.renderAdSets()}</div>;
  }
}

export default AdSets;
