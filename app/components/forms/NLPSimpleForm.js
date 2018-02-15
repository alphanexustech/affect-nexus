import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { Button, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';

import simpleSubmit from './simpleSubmit'


  const required = value => (value ? undefined : 'Required')
  const maxLength = max => value =>
  value && value.length > max ? `Your text must be ${max} characters or less` : undefined
  const maxLength300 = maxLength(300)

  const renderField = ({
    input,
    type,
    rows,
    style,
    placeholder,
    id,
    meta: { touched, error, warning }
  }) => (
    <div>
      <div>
      <textarea id={id} className="form-control" rows={rows} style={style}
      {...input} placeholder={placeholder} type={type} />
      {touched &&
        (error && <span className="help-block">{error}</span>)}
      </div>
    </div>
    )

let NLPSimpleForm = (props) => {

  const { docValue, handleSubmit, pristine, reset, submitting } = props

  return (
    <form onSubmit={handleSubmit(simpleSubmit)}>
      <Row>
        <Col lg={12}>
          <div className="pull-right">
            { !docValue &&
              300
            }
            { docValue && 300 - docValue.length > 0 &&
              300 - docValue.length
            }
            { docValue && 300 - docValue.length < 0 &&
              <span style={{color: '#ffd7d7'}}>{300 - docValue.length}</span>
            }
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <div>
            <Field className="form-control" style={{resize: "none", minHeight: "200px", width: "100%"}}
              name="doc" component={renderField} type="text"
              placeholder="Try writing about an important idea or something else you might find interesting."
              id="analyze-form_text-area"
              validate={[required, maxLength300]}/>
          </div>
        </Col>
      </Row>
      <br></br>
      <Button bsSize="xsmall" className="pull-left" disabled={pristine || submitting} onClick={reset}>Clear Text</Button>
      <Button bsSize="xsmall" className="pull-right" disabled={pristine || submitting} type="submit">Start Analysis</Button>
    </form>
  );
}

// The order of the decoration does not matter.

// Decorate with redux-form
NLPSimpleForm = reduxForm({
  form: 'nlp'  // a unique identifier for this form
})(NLPSimpleForm)

// Decorate with connect to read form values
const selector = formValueSelector('nlp') // <-- same as form name
NLPSimpleForm = connect(
  state => {
    // can select values individually
    let docValue = selector(state, 'doc')
    return {
      docValue
    }
  }
)(NLPSimpleForm)

export default NLPSimpleForm
