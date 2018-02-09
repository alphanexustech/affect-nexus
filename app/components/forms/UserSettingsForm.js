import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { Button, Row, Col, Tooltip, OverlayTrigger, Panel } from 'react-bootstrap';

import userSubmit from './userSubmit'

const UserSettingsForm = (props) => {

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
          <label>E-mail</label>
          <Field className="form-control" style={{width: "100%"}} name="email"
            component="input" type="email" placeholder="E-mail"
            required/>
        </div>
        <div className="form-group">
          <label>First Name</label>
          <Field className="form-control" style={{width: "100%"}} name="firstName"
            component="input" type="text" placeholder="First Name"
            required/>
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <Field className="form-control" style={{width: "100%"}} name="lastName"
            component="input" type="text" placeholder="Last Name"
            required/>
        </div>
        <div className="form-group">
          <label>Display Name</label>
          <Field className="form-control" style={{width: "100%"}} name="displayName"
            component="input" type="text" placeholder="Display Name"
            required/>
        </div>
        <div style={{textAlign: 'right'}}>
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
          <label>Old Password</label>
          <Field className="form-control" style={{width: "100%"}} name="oldPassword"
            component="input" type="password" placeholder="Old Password"
            required/>
        </div>
        <div className="form-group">
          <label>New Password</label>
          <Field className="form-control" style={{width: "100%"}} name="newPassword"
            component="input" type="password" placeholder="New Password"
            required/>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <Field className="form-control" style={{width: "100%"}} name="confirmPassword"
            component="input" type="password" placeholder="Confirm Password"
            required/>
        </div>
        <div style={{textAlign: 'right'}}>
          <Button bsSize="xsmall" className="btn-primary" disabled={pristine || submitting} type="submit">Update Settings</Button>
        </div>
      </div>

      <div style={{margin: "10px 0px", padding: "10px 10px", background: "#454545"}}>
        <div>
          <i className="fa fa-check-circle" aria-hidden="true"></i>Preferences
          <h6 style={{color: "#AAA"}}>
            Configure Preferences
          </h6>
          <br></br>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              <label>
                Affective Data
                <OverlayTrigger placement="top" overlay={ad_tooltip}>
                  <i style={{color: '#AAA'}} className="fa fa-question-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </label>
              <div style={{textAlign: 'left'}}>
                <label>
                  <Field name="affectiveData" component="input" type="radio" value="1" required/> Shared my data
                </label>
                <br></br>
                <label>
                  <Field name="affectiveData" component="input" type="radio" value="0"/> Keep my data private
                </label>
              </div>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <label>
                E-mail Subscription
                <OverlayTrigger placement="top" overlay={es_tooltip}>
                  <i style={{color: '#AAA'}} className="fa fa-question-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </label>
              <div style={{textAlign: 'left'}}>
                <label>
                  <Field name="emailSub" component="input" type="radio" value="1" required/> All updates
                </label>
                <br></br>
                <label>
                  <Field name="emailSub" component="input" type="radio" value="0"/> Only important updates
                </label>
              </div>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <label>
                Web Interface Complexity
                <OverlayTrigger placement="top" overlay={wic_tooltip}>
                  <i style={{color: '#AAA'}} className="fa fa-question-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </label>
              <div style={{textAlign: 'left'}}>
                <label>
                  <Field name="interfaceComplexity" component="input" type="radio" value="1" required/> Advanced
                </label>
                <br></br>
                <label>
                  <Field name="interfaceComplexity" component="input" type="radio" value="0"/> Simple
                </label>
              </div>
            </Col>
          </Row>
        </div>
        <div style={{textAlign: 'right'}}>
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
            </h6>
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
                <a href="https://www.facebook.com/alphanexustech">
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

// Decorate the form component
export default reduxForm({
  form: 'userSettings' // a unique name for this form
})(UserSettingsForm);
