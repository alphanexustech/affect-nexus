import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import { Table, Button, Panel, Row, Col, Modal, Alert } from 'react-bootstrap';

import GeneralErrorComponent from '../../components/errors/GeneralErrorComponent'

import UserSettingsForm from '../../components/forms/UserSettingsForm';
import { receiveSettingsData, deleteProfile } from '../../actions/userActions';

class Settings extends Component {
  constructor(props, context) {
    super(props, context)
    // load settings information for the user
    this.props.dispatch(receiveSettingsData());

    // Modal behavior
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

    this.state = {
      showModal: false
    }
  }

  handleDelete() {
    const { dispatch, loading } = this.props;
    dispatch(deleteProfile())
  }

  handleShowModal() {
    this.setState({ showModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  render () {
    const { handleSubmit, settings, updating, error, successfullyUpdated, user, loading } = this.props;
    const confirmationErrorMsg = 'The confirmation password must match the password.';
    const trivialError = this.props.error == confirmationErrorMsg;
    const criticalError = !trivialError && this.props.error;

    return (
      <div>
        <Link className="pull-right btn btn-xs btn-primary" to="/nexus">
          <i className="fa fa-angle-double-left" aria-hidden="true"></i> Back to Nexus
        </Link>
        <h3><i className="fa fa-cogs" aria-hidden="true"></i> Settings</h3>
        <p>
          Configure your settings
        </p>
        <h6>
          Modify your Profile, Password, and Preferences
        </h6>
        <hr></hr>
        { criticalError &&
          <GeneralErrorComponent error={error}></GeneralErrorComponent>
        }
        { this.props.updating && !criticalError &&
          <div className="settings--preference_bottom-right-corner_status-loading">Loading...</div>
        }
        { !this.props.updating && !criticalError && successfullyUpdated &&
          <div className="settings--preference_bottom-right-corner_status-success">Updated Successfully!</div>
        }
        { !this.props.updating && trivialError &&
          <div className="settings--preference_bottom-right-corner_status-error">{error}</div>
        }
        { !this.props.updating && trivialError &&
          <div className="settings--preference_bottom-right-corner_status-error">{error}</div>
        }
        { !this.props.error && !criticalError &&
          <Row>
            <Col md={6} mdOffset={3} style={{textAlign: "right"}}>
              Please send us your <a style={{marginLeft: "4px"}} className="more_info_link" href="mailto:contact@alphanex.us?Subject=Affect%20Nexus">
                <i className="fa fa-1x fa-envelope"></i>
                Feedback
              </a>
            </Col>
          </Row>
        }
        { !criticalError &&
          <div>
            <br></br>
            <Row>
              <Col md={6} mdOffset={3}>
                { loading && !successfullyUpdated &&
                  <Alert bsStyle="success">Loading...</Alert>
                }
                { (!loading || successfullyUpdated) &&
                  <UserSettingsForm />
                }
              </Col>
            </Row>
            <Row>
              <Col md={6} mdOffset={3}>
                <div style={{margin: "10px 0px", padding: "10px 10px", background: "#ffd7d7"}}>
                  <div style={{color: "#222"}}>
                    <i className="fa fa-trash" aria-hidden="true"></i> Delete Profile
                    <h6 style={{color: "#454545"}}>
                      If you would like to ensure that we no longer collect, disclose,
                      or contact you, then you may delete your account.
                      You may also get in touch with us
                      at <a style={{color: '#010101'}} href="mailto:contact@alphanex.us?Subject=Affect%20Nexus">
                        contact@alphanex.us
                      </a> for
                      more information.
                    </h6>
                    <br></br>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <Button bsSize="xsmall" className="btn-danger" type="button"onClick={this.handleShowModal}>Delete Profile</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        }

        <div>
          <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Are you absolutely sure?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <h6>
                This action <b>cannot</b> be undone.
              </h6>
              <h6>
                This action will <b><i>NOT</i></b> remove any data you have already provided us.
                <br></br>
                This action will <b><i>NOT</i></b> refund any purchases you have already made.
              </h6>
              <h6>
                Are you sure you want to delete your profile?
              </h6>
            </Modal.Body>

            <Modal.Footer>
              <Button className="btn-link pull-left" onClick={this.handleCloseModal}>Never mind</Button>
              <Button to="/" className="btn btn-danger pull-right" onClick={this.handleDelete}>Yes, delete my profile.</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { settings, updating, error, successfullyUpdated, user } = state.settingsUpdates;
  const { loading } = state.settings;
  return {
    settings,
    updating,
    error,
    successfullyUpdated,
    user,
    loading
  }
}

export default connect(mapStateToProps)(Settings);
