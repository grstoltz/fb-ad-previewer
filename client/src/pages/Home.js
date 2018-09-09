import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react';

import Footer from '../components/Footer';

const Home = (props, mobile) => (
  /* eslint-disable react/no-multi-comp */
  <div>
    <Segment vertical>
      <Container text>
        <Header
          as="h1"
          content="Facebook Ad Previewer"
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em'
          }}
        />
        <Header
          as="h2"
          content="Share Facebook Ads with clients and coworkers with ease."
          style={{
            fontSize: mobile ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em'
          }}
        />
        <Link to="/upload">
          <Button primary size="huge">
            Get Started
            <Icon name="right arrow" />
          </Button>
        </Link>
      </Container>
    </Segment>
    <Segment style={{ padding: '8em 0em', marginBottom: '17%' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          How Do I Use This?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Trying to send clients drafts of all the beautiful Facebook Ads you
          made them? Simply export the ads you want to share from the Facebook
          Ads interface into a .csv file and upload it here! You'll get a URL to
          send to your clients so they'll be able to see the awesome ads you
          made!
        </p>
        <Link to="/upload">
          <Button size="large">Let's do it!</Button>
        </Link>
      </Container>
    </Segment>
    <Footer />
  </div>
);

export default Home;
