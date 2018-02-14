import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Panel, Accordion } from 'react-bootstrap';

import NLPSimpleForm from '../../components/forms/NLPSimpleForm'

class NLPSimpleDisplay extends Component {
  render () {
    return (
      <div>
        <Link className="pull-right btn btn-xs btn-primary" to="/nexus">
          <i className="fa fa-angle-double-left" aria-hidden="true"></i> Back
        </Link>
        <h3><i className="fa fa-long-arrow-right" aria-hidden="true"></i> Process</h3>
        <p>
          Start a process
        </p>
        <h6>
          Write up to 300 characters of text and click the button in the bottom right corner to find emotions.
        </h6>
        <div style={{paddingTop: '0px'}}>
          <NLPSimpleForm/>
        </div>
      </div>
    );
  }
}

export default NLPSimpleDisplay;
