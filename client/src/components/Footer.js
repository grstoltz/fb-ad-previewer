import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Grid, Segment } from 'semantic-ui-react';

const Footer = props => (
  <Segment inverted vertical style={{ padding: '1em 0em', marginTop: '5%' }}>
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
