import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
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
        <Link className="pull-right btn btn-xs"
              style={{background: '#EEEEEE', color: '#131313'}}
              to="/process">
          <i className="fa fa-angle-double-right" aria-hidden="true"></i> Run a process
        </Link>
        <h3><i className="fa fa-bullseye" aria-hidden="true"></i> Nexus</h3>
        <p>
          View recent processes
        </p>
        { sessionStorage.getItem('interfaceComplexity') == "1" && // Only show if advanced complexity selected
          <div>
            <h6>
                Your most recent processes will always be displayed on this page.
                Good luck!
            </h6>
            <br></br>
          </div>
        }
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
