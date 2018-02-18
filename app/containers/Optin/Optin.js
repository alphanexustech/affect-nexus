import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import { Table, Button, Panel, Row, Col, Modal } from 'react-bootstrap';

import { receiveSettingsData, userSettingsUpdate } from '../../actions/userActions';

class Optin extends Component {
  constructor(props, context) {
    super(props, context)
    // load settings information for the user
    this.props.dispatch(receiveSettingsData());

    this.handleSettingsUpdate = this.handleSettingsUpdate.bind(this)
  }

  handleSettingsUpdate() {
    const { dispatch, user } = this.props;
    let userData = user
    userData['affectiveData'] = "1";
    dispatch(userSettingsUpdate(user))
  }

  render () {
    const { settings, loading, user } = this.props;

    return (
      <div>
        <Row>
          <Col smOffset={2} mdOffset={2} lgOffset={2} sm={8} md={8} lg={8}>
            <div style={{textAlign: 'center', paddingTop: '64px'}}>
              <h2>
                Thanks for signing up!
              </h2>
              <br></br>
              <h5>
                Our products are more reliable and useful when we have data.
              </h5>
              <h5>
                May we use your data for research and development?
              </h5>
              <h6 style={{color: '#888888'}}>
                You can change your choice on the settings page.
              </h6>
            </div>
            <hr></hr>
            <div className="settings--settings_group-buttons">
              <Link to="/nexus" className="btn btn-link" onClick={this.handleOptInNo}>Not right now</Link>
              <Link to="/nexus" className="btn btn-primary" onClick={this.handleSettingsUpdate} style={{minWidth: "130px"}}
                      disabled={loading ? true : false}>{loading ? "Thinking..." : 'Yes'}</Link>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Optin.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { settings, loading, user } = state.settings;
  return {
    settings,
    loading,
    user
  }
}

export default connect(mapStateToProps)(Optin);
