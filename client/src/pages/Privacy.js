import React, { Component } from 'react';
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
    <Container text>
      <Header as="h1" style={{ padding: '1em 0em', fontSize: '2em' }}>
        Privacy Policy
      </Header>
      <p style={{ fontSize: '1.33em' }}>
        <p>
          This privacy notice discloses the privacy practices for{' '}
          <a>https://fb-ad-previewer.herokuapp.com/</a>. This privacy notice
          applies solely to information collected by this website. It will
          notify you of the following:
        </p>
        <p>
          <ul>
            <li>
              What personally identifiable information is collected from you
              through the website, how it is used and with whom it may be
              shared.
            </li>
            <li>
              What choices are available to you regarding the use of your data.
            </li>
            <li>
              The security procedures in place to protect the misuse of your
              information.
            </li>
            <li>How you can correct any inaccuracies in the information.</li>
          </ul>
        </p>
        <Header as="h3">Information Collection, Use, and Sharing</Header>
        <p>
          We are the sole owners of the information collected on this site. We
          only have access to/collect information that you voluntarily give us
          via email or other direct contact from you. We will not sell or rent
          this information to anyone.
        </p>
        <p>
          We will use your information to respond to you, regarding the reason
          you contacted us. We will not share your information with any third
          party outside of our organization, other than as necessary to fulfill
          your request.
        </p>
        <Header as="h3">Your Access to and Control Over Information</Header>
        <p>
          You can do the following at any time by contacting us via the email
          address or phone number given on our website:
        </p>
        <p>
          <ul>
            <li>See what data we have about you, if any.</li>
            <li>Change/correct any data we have about you.</li>
            <li>Have us delete any data we have about you.</li>
            <li>Express any concern you have about our use of your data.</li>
          </ul>
        </p>
        <Header as="h3">Security</Header>
        <p>
          We take precautions to protect your information. When you submit
          sensitive information via the website, your information is protected
          both online and offline.
        </p>
        <p>
          Wherever we collect sensitive information, that information is
          encrypted and transmitted to us in a secure way. You can verify this
          by looking for a lock icon in the address bar and looking for "https"
          at the beginning of the address of the Web page.
        </p>
        <p>
          While we use encryption to protect sensitive information transmitted
          online, we also protect your information offline. Only employees who
          need the information to perform a specific job are granted access to
          personally identifiable information. The servers in which we store
          personally identifiable information are kept in a secure environment.
        </p>
      </p>
    </Container>
    <Footer />
  </div>
);

export default Home;
