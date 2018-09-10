import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';

import Footer from '../components/Footer';

const NoMatch = (props, mobile) => (
  /* eslint-disable react/no-multi-comp */
  <div>
    <Container text>
      <Header
        as="h1"
        content="404 - Page Not Found"
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em'
        }}
      />
      <Header
        as="h2"
        content="Something went wrong"
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em'
        }}
      />
      <Link to="/">
        <Button primary size="huge">
          Go Home
          <Icon name="right arrow" />
        </Button>
      </Link>
    </Container>
    <Footer />
  </div>
);

export default NoMatch;
