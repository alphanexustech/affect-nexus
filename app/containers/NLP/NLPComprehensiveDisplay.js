import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Panel, Accordion } from 'react-bootstrap';

import NLPComprehensiveForm from '../../components/forms/NLPComprehensiveForm'
import NLPComprehensiveTable from '../../components/tables/NLPComprehensiveTable'
import NLPRankTable from '../../components/tables/NLPRankTable'
import NLPLaggerTable from '../../components/tables/NLPLaggerTable'

import NLPNLTKPOSTable from '../../components/tables/NLPNLTKPOSTable'

class NLPDisplay extends Component {
  render () {
    return (
      <div>
        <Link className="pull-right btn btn-xs btn-primary" to="/nexus">
          <i className="fa fa-angle-double-left" aria-hidden="true"></i> Back
        </Link>
        <h3><i className="fa fa-level-down" aria-hidden="true"></i> Process</h3>
        <p>
          Start a process
        </p>
        <h6>
          After you start a process, words you provide will likely match words the process uses.
          Remember, hover your mouse over the form icon in the bottom right corner to begin exploring!
        </h6>
        <h6>
          You might be curious about how this all works,
          and here’s some information on what’s going on.
          Exact matches are with words where each character is the same.
          A Partial match (aka Stemming) happens when a consecutive and meaningful subset of characters in a word you provide match a word the process uses.
          A Base Form match (aka Lemmatizing) happens when the contextual changes in the Part-of-speech of a word you provide match a word the process uses.
        </h6>
        <h6>
          The process ultimately finds synonyms of emotion words. Try to experiment and see what happens!
        </h6>
        <div style={{paddingBottom: '100px'}}>

          {/* These panels get fixed around the edge of the screen */}
          <div className="transparent--module transparent--module_alt-01 transparent--module_module-3">
            <div className="transparent--module_module-content">
              <NLPNLTKPOSTable/>
            </div>
            <div className="transparent--module_module-icon">
              <i className="fa fa-2x fa-key" aria-hidden="true"></i>
            </div>
          </div>
          <div className="transparent--module transparent--module_alt-01 transparent--module_form--nlp">
            <div className="transparent--module_module-icon">
              <i className="fa fa-2x fa-list-alt" aria-hidden="true"></i>
            </div>
            <div className="transparent--module_module-content">
              <NLPComprehensiveForm/>
            </div>
          </div>
          <div className="transparent--module transparent--module_alt-01 transparent--module_module-1">
            <div className="transparent--module_module-content">
              <NLPRankTable/>
            </div>
            <div className="transparent--module_module-icon">
              <i className="fa fa-2x fa-table" aria-hidden="true"></i>
            </div>
          </div>
          <div className="transparent--module transparent--module_alt-01 transparent--module_module-2">
            <div className="transparent--module_module-content">
              <NLPLaggerTable/>
            </div>
            <div className="transparent--module_module-icon">
              <i className="fa fa-2x fa-table" aria-hidden="true"></i>
            </div>
          </div>

          <Row>
            <Col lg={12}>
              <div>
                <NLPComprehensiveTable/>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default NLPDisplay;
