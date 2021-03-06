import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { Button, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';

import submit from './submit'


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

let NLPComprehensiveForm = (props) => {
  const { docValue, handleSubmit, pristine, reset, submitting } = props

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
    <form onSubmit={handleSubmit(submit)}>
      <Row>
        <Col lg={12}>
          <label>Language <span style={{color: 'gray'}}>(only English for now)</span></label><br></br>
          <div>
            {/* TODO: Get the options via a call to the server!*/}
            <Field className="form-control" name="lang"
              component="select" required>
              <option value="english">English</option>
            </Field>
          </div>
          <br></br>
          <div>
            <label>Emotion Set</label>
            <div>
              {/* TODO: Get the options via a call to the server!*/}
              <Field className="form-control" name="emotion_set"
                component="select" required>
                <option value="all_emotions">All Emotions</option>
                <option value="emotion_ml">Emotion Markup Language</option>
                <option value="big_6">Big 6</option>
                <option value="everday_categories">Everyday Categories</option>
                <option value="occ_categories">OCC Categories</option>
                <option value="fsre_categories">FSRE Categories</option>
                <option value="frijda_categories">Frijda Categories</option>
                <option value="dimensions">Dimensions</option>
              </Field>
            </div>
          </div>
          <br></br>
          <div>
            <label>
              Write up to 300 characters of text and click the button in the bottom right corner to find emotions.
            </label>
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
            <Field className="form-control" style={{resize: "none", minHeight: "64px", width: "100%"}}
              name="doc" component={renderField} type="text"
              placeholder="Try writing about an important idea or something else you might find interesting."
              id="analyze-form_text-area"
              validate={[required, maxLength300]}/>
          </div>
          <div style={{margin: "10px 0px", padding: "10px 10px", background: "#454545"}}>
            <div>
              Constrain the affect words to use from the corpora.
              <br></br>
              <h6 style={{color: "#AAA"}}>
                (Setting both bounds to 25 will use the middle 50 percent of the affect words.)
              </h6>
            </div>
            <label>Upper Bound</label>
            <div>
              <Field className="form-control" style={{width: "100%"}} name="ub"
                component="input" type="number" placeholder="0-100" min="0" max="100"
                required/>
            </div>
            <br></br>
            <label>Lower Bound</label>
            <div>
              <Field className="form-control" style={{width: "100%"}} name="lb"
                component="input" type="number" placeholder="0-100" min="0" max="100"
                required/>
            </div>
            <br></br>
            <div>
              Constrain how the document is scored.
              <br></br>
              <h6 style={{color: "#AAA"}}>
                (Partial and Base Form matching changes your words as the process runs.)
              </h6>
            </div>
            <Row style={{textAlign: 'center'}}>
              <Col md={4} lg={4}>
                <label>
                  <i className="fa fa-pull-left fa-check-circle affect--emotion_fa-icon-adjustment" aria-hidden="true"></i> Exact
                  <OverlayTrigger placement="top" overlay={e_tooltip}>
                    <i style={{color: '#AAA'}} className="fa fa-question-circle" aria-hidden="true"></i>
                  </OverlayTrigger>
                </label>
                <div style={{textAlign: 'left'}}>
                  <label><Field name="natural" component="input" type="radio" value="1" required/> Included</label>
                  <br></br>
                  <label><Field name="natural" component="input" type="radio" value="0"/> Excluded</label>
                </div>
              </Col>
              <Col md={4} lg={4}>
                <label>
                  <i className="fa fa-pull-left fa-cut affect--emotion_fa-icon-adjustment" aria-hidden="true"></i> Partial
                  <OverlayTrigger placement="top" overlay={p_tooltip}>
                    <i style={{color: '#AAA'}} className="fa fa-question-circle" aria-hidden="true"></i>
                  </OverlayTrigger>
                </label>
                <div style={{textAlign: 'left'}}>
                  <label><Field name="stemmer" component="input" type="radio" value="1" required/> Included</label>
                  <br></br>
                  <label><Field name="stemmer" component="input" type="radio" value="0"/> Excluded</label>
                </div>
              </Col>
              <Col md={4} lg={4}>
                <label>
                  <i className="fa fa-pull-left fa-cubes affect--emotion_fa-icon-adjustment" aria-hidden="true"></i> Base Form
                  <OverlayTrigger placement="top" overlay={bf_tooltip}>
                    <i style={{color: '#AAA'}} className="fa fa-question-circle" aria-hidden="true"></i>
                  </OverlayTrigger>
                </label>
                <div style={{textAlign: 'left'}}>
                  <label><Field name="lemma" component="input" type="radio" value="1" required/> Included</label>
                  <br></br>
                  <label><Field name="lemma" component="input" type="radio" value="0"/> Excluded</label>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Button bsSize="xsmall" className="pull-left" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
      <Button bsSize="xsmall" className="pull-right" disabled={pristine || submitting} type="submit">Start Analysis</Button>
    </form>
  );
}

// The order of the decoration does not matter.

// Decorate with redux-form
NLPComprehensiveForm = reduxForm({
  form: 'nlp'  // a unique identifier for this form
})(NLPComprehensiveForm)

// Decorate with connect to read form values
const selector = formValueSelector('nlp') // <-- same as form name
NLPComprehensiveForm = connect(
  state => {
    // can select values individually
    let docValue = selector(state, 'doc')
    return {
      docValue
    }
  }
)(NLPComprehensiveForm)

export default NLPComprehensiveForm
