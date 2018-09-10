import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Grid, Segment } from 'semantic-ui-react';

const Footer = props => (
  <Segment
    inverted
    vertical
    style={{
      right: 0,
      bottom: 0,
      left: 0,
      padding: '1rem',
      marginTop: '5px',
      textAlign: 'center'
    }}
  >
    <Container>
      <Grid divided inverted stackable centered>
        <Grid.Row>
          <Grid.Column width={2}>
            <Link to="/privacy-policy">
              <p align="center">Pivacy Policy</p>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;
