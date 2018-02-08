import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Table, Button, Panel, Row, Col } from 'react-bootstrap';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Link className="pull-right btn btn-xs btn-primary" to="/nexus">
          <i className="fa fa-angle-double-left" aria-hidden="true"></i> Back
        </Link>
        <h3><i className="fa fa-cogs" aria-hidden="true"></i> Settings</h3>
        <p>
          Configure your settings
        </p>
        <h6>
          Change your E-mail address, profile, and other preferences
        </h6>
        <br></br>
        <Row>
          <Col lg={12}>
            Please send feedback to
            <a className="more_info_link" href="mailto:contact@alphanex.us?Subject=Hello%20Affec%20tNexus">
              <i className="fa fa-1x fa-envelope"></i>
              me
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Settings
