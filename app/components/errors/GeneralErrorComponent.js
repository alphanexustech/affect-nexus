import React, { Component } from 'react';

import { Alert } from 'react-bootstrap';

export default class GeneralErrorComponent extends Component {
  render () {
    const { error } = this.props;
    return (
      <Alert bsStyle="danger">{error}</Alert>
    );
  }
}
