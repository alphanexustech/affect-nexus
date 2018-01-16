import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Button, Panel, Row, Col } from 'react-bootstrap';


import NLPNexusList from '../../components/lists/NLPNexusList';

class Nexus extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { handleSubmit } = this.props;
    const notImplemented = {textDecoration: "line-through", color: "gray"}
    return (
      <div>
        <h3><i className="fa fa-bullseye" aria-hidden="true"></i> Nexus</h3>
        <p>
          View recent processes
        </p>
        <h6>
          Your nexus is your place to start exploring.
          As you begin exploring, your most recent processes will always be displayed on this page.
          Good luck!
        </h6>
        <br></br>
        <Row>
          <Col lg={12}>
            <NLPNexusList/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Nexus