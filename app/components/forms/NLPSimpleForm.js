import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { Button, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';

import simpleSubmit from './simpleSubmit'

const NLPSimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props

  const e_tooltip = (
  	<Tooltip id="tooltip">
      Exact matches are with words where each character is the same.
  	</Tooltip>
  );
  const p_tooltip = (
  	<Tooltip id="tooltip">
      A Partial match (aka Stemming) happens when a consecutive and meaningful subset of characters in a word you provide match a word the process uses.
  	</Tooltip>
  );
  const bf_tooltip = (
  	<Tooltip id="tooltip">
      A Base Form match (aka Lemmatizing) happens when the contextual changes in the Part-of-speech of a word you provide match a word the process uses.
  	</Tooltip>
  );

  return (
    <form onSubmit={handleSubmit(simpleSubmit)}>
      <Row>
        <Col lg={12}>
          <div>
            <Field className="form-control" style={{minHeight: "200px", width: "100%"}} rows="4" name="doc"
              component="textarea" type="text" placeholder="Try writing about an important idea or something else you might find interesting."
              id="analyze-form_text-area" required/>
          </div>
        </Col>
      </Row>
      <br></br>
      <Button bsSize="xsmall" className="pull-left" disabled={pristine || submitting} onClick={reset}>Clear Text</Button>
      <Button bsSize="xsmall" className="pull-right" disabled={pristine || submitting} type="submit">Start Analysis</Button>
    </form>
  );
}

// Decorate the form component
export default reduxForm({
  form: 'nlp' // a unique name for this form
})(NLPSimpleForm);
