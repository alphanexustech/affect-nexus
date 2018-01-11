import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Panel, Accordion } from 'react-bootstrap';

import NLPComprehensiveForm from '../../components/forms/NLPComprehensiveForm'
import NLPComprehensiveTable from '../../components/tables/NLPComprehensiveTable'
import NLPRankTable from '../../components/tables/NLPRankTable'
import NLPLaggerTable from '../../components/tables/NLPLaggerTable'

import NLPNLTKPOSTable from '../../components/tables/NLPNLTKPOSTable'

class NLPDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  handleRefreshClick(e) {
    e.preventDefault();
  }

  render () {
    const { } = this.props;

    return (
      <div>
        <Link className="pull-right btn btn-xs btn-primary" to="/overview">
              Back
        </Link>
        <div style={{paddingBottom: '100px'}}>
          <h3><i className="fa fa-tint" aria-hidden="true"></i>  Precise Processing</h3>

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

NLPDisplay.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { } = state;

  return {
  };
}

export default connect(mapStateToProps)(NLPDisplay);
