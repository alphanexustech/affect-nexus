import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Button, Row, Col, Tooltip, OverlayTrigger, Panel } from 'react-bootstrap';

import userSubmit from './userSubmit'


    const required = value => (value ? undefined : 'Required')
    const maxLength = max => value =>
      value && value.length > max ? `Must be ${max} characters or less` : undefined
    const maxLength64 = maxLength(64)
    export const minLength = min => value =>
      value && value.length < min ? `Must be ${min} characters or more` + value : undefined
    export const minLength4 = minLength(4)
    const email = value =>
      value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined

    const renderField = ({
      input,
      label,
      type,
      meta: { touched, error, warning }
    }) => (
      <div>
        <label>{label}</label>
        <div>
          <input className="form-control" style={{width: "100%"}}
            {...input} placeholder={label} type={type} />
          {touched &&
            (error && <span className="help-block">{error}</span>)}
        </div>
      </div>
    )

let UserSettingsForm = (props) => {

  const { handleSubmit, pristine, reset, submitting } = props

  const ad_tooltip = (
  	<Tooltip id="tooltip">
      Our products are more reliable and useful when we have data. May we use your data for research and development?
  	</Tooltip>
  );

  const es_tooltip = (
  	<Tooltip id="tooltip">
      What updates do you want to receive by E-mail?
  	</Tooltip>
  );

  const wic_tooltip = (
  	<Tooltip id="tooltip">
      Which interface would you like?
  	</Tooltip>
  );

  return (
    <form onSubmit={handleSubmit(userSubmit)}>
      <div style={{margin: "10px 0px", padding: "10px 10px", background: "#454545"}}>
        <div>
           <i className="fa fa-user"></i> Profile
          <h6 style={{color: "#AAA"}}>
            Change information about your profile
          </h6>
          <br></br>
        </div>
        <div className="form-group">
          <Field name="email"
            component={renderField} type="email" label="E-mail"
            validate={[required, email]}/>
        </div>
        <div className="form-group">
          <Field name="firstName"
            component={renderField} type="text" label="First Name"
            validate={[maxLength64]} />
        </div>
        <div className="form-group">
          <Field name="lastName"
            component={renderField} type="text" label="Last Name"
            validate={[maxLength64]}/>
        </div>
        <div className="form-group">
          <Field name="displayName"
            component={renderField} type="text" label="Display Name"
            validate={[maxLength64]}/>
        </div>
        <div className="settings--settings_group-buttons">
          <Button bsSize="xsmall" className="btn-link" disabled={pristine || submitting} onClick={reset}>Undo All Changes</Button>
          <Button bsSize="xsmall" className="btn-primary" disabled={pristine || submitting} type="submit">Update Settings</Button>
        </div>
      </div>

      <div style={{margin: "10px 0px", padding: "10px 10px", background: "#454545"}}>
        <div>
          <i className="fa fa-lock"></i> Password
          <h6 style={{color: "#AAA"}}>
            Manage your log in information
          </h6>
          <br></br>
        </div>
        <div className="form-group">
          <Field name="newPassword"
            component={renderField} type="password" label="New Password"
            validate={[minLength4]}/>
        </div>
        <div className="form-group">
          <Field name="confirmPassword"
            component={renderField} type="password" label="Confirm Password"
            validate={[minLength4]}/>
        </div>
        <div className="settings--settings_group-buttons">
          <Button bsSize="xsmall" className="btn-link" disabled={pristine || submitting} onClick={reset}>Undo All Changes</Button>
          <Button bsSize="xsmall" className="btn-primary" disabled={pristine || submitting} type="submit">Update Settings</Button>
        </div>
      </div>

      <div style={{margin: "10px 0px", padding: "10px 10px", background: "#454545"}}>
        <div>
          <i className="fa fa-check-circle" aria-hidden="true"></i> Preferences
          <h6 style={{color: "#AAA"}}>
            Configure Preferences
          </h6>
          <br></br>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <label>
                Affective Data
                <OverlayTrigger placement="top" overlay={ad_tooltip}>
                  <i style={{color: '#AAA'}} className="fa fa-question-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </label>
              <br></br>
              <div className="settings--preferences_toggle-group">
                <label className="settings--preferences_toggle-group_label-margin">
                  <Field name="affectiveData" component="input" type="radio" value="1" required/> Share my data
                </label>
                <br></br>
                <label className="settings--preferences_toggle-group_label-margin">
                  <Field name="affectiveData" component="input" type="radio" value="0"/> Keep my data private
                </label>
              </div>
              <br></br>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <label>
                E-mail Subscription
                <OverlayTrigger placement="top" overlay={es_tooltip}>
                  <i style={{color: '#AAA'}} className="fa fa-question-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </label>
              <br></br>
              <div className="settings--preferences_toggle-group">
                <label className="settings--preferences_toggle-group_label-margin">
                  <Field name="emailSub" component="input" type="radio" value="1" required/> All updates
                </label>
                <br></br>
                <label className="settings--preferences_toggle-group_label-margin">
                  <Field name="emailSub" component="input" type="radio" value="0"/> Only important updates
                </label>
              </div>
              <br></br>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <label>
                Web Interface Complexity
                <OverlayTrigger placement="top" overlay={wic_tooltip}>
                  <i style={{color: '#AAA'}} className="fa fa-question-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </label>
              <br></br>
              <div className="settings--preferences_toggle-group">
                <label className="settings--preferences_toggle-group_label-margin">
                  <Field name="interfaceComplexity" component="input" type="radio" value="1" required/> Advanced
                </label>
                <br></br>
                <label className="settings--preferences_toggle-group_label-margin">
                  <Field name="interfaceComplexity" component="input" type="radio" value="0"/> Simple
                </label>
              </div>
            </Col>
          </Row>
        </div>
        <div className="settings--settings_group-buttons">
          <Button bsSize="xsmall" className="btn-link" disabled={pristine || submitting} onClick={reset}>Undo All Changes</Button>
          <Button bsSize="xsmall" className="btn-primary" disabled={pristine || submitting} type="submit">Update Settings</Button>
        </div>
      </div>

      <div style={{margin: "10px 0px", padding: "10px 10px", background: "#454545"}}>
        <div>
          <div>
             <i className="fa fa-question-circle-o"></i> About
            <h6 style={{
                color: "#AAA"
              }}>
              About Alpha Nexus
              <div style={{
                padding: '16px',
                float: 'right'
              }}>
                <i className="fa fa-file-o" aria-hidden="true"></i> <a href="http://alphanex.us/tos.pdf">Terms of Service</a>
              </div>
              <div style={{
                padding: '16px',
                float: 'right'
              }}>
                <i className="fa fa-file-o" aria-hidden="true"></i> <a href="http://alphanex.us/privacy.pdf">Privacy Policy</a>
              </div>
            </h6>
            <br></br>
            <h6 style={{marginTop: '32px'}}>
              Alpha Nexus Web Version <span style={{color: "#AAA"}}>(Desktop and Browser)</span>
              <div style={{padding: '16px'}}>
                GPLv3 2017-2018 Alpha Nexus Technologies
                <br></br>
                <span style={{color: "AAA"}}>
                  Alpha Nexus Technologies LLC, hereby disclaims all copyright interest in the WEB VERSION of the program "Affect Nexus" (which deconstructs trees).
                </span>
              </div>
            </h6>
            <h6 style={{marginTop: '32px'}}>
              Alpha Nexus Mobile <span style={{color: "#AAA"}}>(Android)</span>
              <div style={{padding: '16px'}}>
                © 2017-2018 Alpha Nexus Technologies LLC
                <br></br>
                <span style={{color: "AAA"}}>
                  All Rights Reserved.
                </span>
              </div>
            </h6>
            <h6 style={{marginTop: '32px'}}>
              <Panel style={{textAlign: "center"}}>
                Enjoy using Affect Nexus? Connect with us!
                <br></br>
                <br></br>
                <a id="facebookLink" href="https://www.facebook.com/alphanexustech">
                  <i className="social-icon fa fa-2x fa-facebook-official"></i>
                </a>
              </Panel>
            </h6>
          </div>
        </div>
      </div>
    </form>
  );
}

UserSettingsForm = reduxForm({
  form: 'userSettings' // a unique identifier for this form
})(UserSettingsForm)

// You have to connect() to any reducers that you wish to connect to yourself
UserSettingsForm = connect(
  state => ({
    initialValues: state.settings.user, // pull initial values from settings reducer
  }),
  // { load: <a reducer> } //you can bind the settigs loading action creator here, but I do it in the parent component <-- contianers/Settings/Settings.js
)(UserSettingsForm)

export default UserSettingsForm
