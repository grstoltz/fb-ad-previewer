import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Modal, Button, Input, Message } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class AlertModal extends Component {
  state = {
    value: '',
    copied: false
  };

  componentDidMount() {
    this.setState({
      value: `${window.location.host}/a/${this.props.instanceId}`
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: `${window.location.host}/a/${props.instanceId}`
    });
  }

  render() {
    return (
      <Modal open={this.props.isOpen} size="large" style={{ height: '15%' }}>
        <Modal.Header>Complete!</Modal.Header>
        <Modal.Content>
          {this.state.copied ? (
            <Message positive>Copied to clipboard.</Message>
          ) : null}
          <Input
            style={{ width: '80%' }}
            value={this.state.value}
            onChange={({ target: { value } }) =>
              this.setState({ value, copied: false })
            }
          />
          <CopyToClipboard
            text={this.state.value}
            onCopy={() => this.setState({ copied: true })}
          >
            <Button>Copy to clipboard!</Button>
          </CopyToClipboard>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.handleClose} negative>
            Close
          </Button>
          <Link to={`/a/${this.props.instanceId}`}>
            <Button
              positive
              icon="angle double right"
              labelPosition="right"
              content="Take Me There"
            />
          </Link>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AlertModal;
