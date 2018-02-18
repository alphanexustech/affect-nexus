import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Panel, Accordion, Alert } from 'react-bootstrap';

import GeneralErrorComponent from '../../components/errors/GeneralErrorComponent'

import NLPSimpleForm from '../../components/forms/NLPSimpleForm'

class NLPSimpleDisplay extends Component {

  render () {
    const { isFetching, loading } = this.props;

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

        <div>
          {isFetching && this.props.error &&
            <GeneralErrorComponent error={this.props.error} />
          }
          { !this.props.error &&

              <div>
                {loading &&
                  <Alert bsStyle="success">Loading...</Alert>
                }
                {!loading &&
                <NLPSimpleForm isFetching={isFetching} loading={loading}/>
                }
              </div>

          }
        </div>



        </div>
      </div>
    );
  }
}

NLPSimpleDisplay.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { dataByDataset, load } = state;
  if (dataByDataset['error']) {
    return {
      error: dataByDataset['error'],
      lastUpdated: null,
      isFetching: true,
      data: [],
      loading: load['loading']
    }
  } else {
    const {
      isFetching,
      lastUpdated,
      items: data
    } = dataByDataset['nlp'] || {
      isFetching: false,
      items: []
    };

    return {
      data,
      isFetching,
      lastUpdated,
      loading: load['loading']
    };
  }
}

export default connect(mapStateToProps)(NLPSimpleDisplay);
