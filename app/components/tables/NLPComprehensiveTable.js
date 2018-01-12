import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Alert } from 'react-bootstrap';

import NLPComprehensiveTableModule from '../tables/NLPComprehensiveTableModule'
import NLPCondensedTableModule from '../tables/NLPCondensedTableModule'

class NLPComprehensiveTable extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { data, isFetching, lastUpdated } = this.props;

    var primaryArea = '',
        secondaryArea = '',
        primaryAlert = '',
        secondaryAlert = '',
        arrayName = null;

    if (this.props.data.length > 0) {
      primaryArea = [];
      secondaryArea = [];
      primaryAlert = 'The top ten emotions words from emotion set are sorted. The list is ordered based on the Normalized Score and is ranked';
      secondaryAlert = 'The remaining emotion list is sorted. The list is ordered based on the Normalized Score and is ranked';
      let targetData = this.props.data[0].data
      arrayName = targetData.name
      let array = targetData.emotion_set.sort(function(a,b) {
                      return b.normalized_r_score - a.normalized_r_score;
                  });
      let doc = targetData.doc
      if (array.length < 1) {
        primaryAlert = null
        secondaryAlert = null
        primaryArea.push(
          [<div key="error">There was an error. Sorry about that, try something else!</div>]
        )
      } else {
        switch (arrayName) {
          case 'big_6':
            primaryAlert = 'Paul Ekman\'s "Big Six" emotion words are scored, normalized, and ranked';
            secondaryAlert = null;
            for (var i = 0; i < 6; i++) {
              primaryArea.push(
                <NLPComprehensiveTableModule key={i + '-affect-table'} doc={doc} array={array} iterator={i}></NLPComprehensiveTableModule>
              )
            }
            break;
          case 'dimensions':
            primaryAlert = 'Dimensional emotion words are scored, normalized, and ranked';
            secondaryAlert = null;
            for (var i = 0; i < 7; i++) {
              primaryArea.push(
                <NLPComprehensiveTableModule key={i + '-affect-table'} doc={doc} array={array} iterator={i}></NLPComprehensiveTableModule>
              )
            }
            break;
          default:
            /*
            handles 'all_emotions':
            handles 'emotion_ml':
            */
            for (var i = 0; i < 10; i++) {
              primaryArea.push(
                <NLPComprehensiveTableModule key={i + '-affect-table'} doc={doc} array={array} iterator={i}></NLPComprehensiveTableModule>
              )
            }
            for (var i = 10; i < array.length; i++) {
              secondaryArea.push(
                <NLPCondensedTableModule key={i + '-affect-table'} doc={doc} array={array} iterator={i}></NLPCondensedTableModule>
              )
            }
            break;
        }
        // End switch
      }
    }
    return (
      <div>
        {isFetching && data.length === 0 &&
          <Alert bsStyle="success">
            Hover your mouse over the form icon in the bottom right corner to begin exploring!
            After filling out the form, all the results will be displayed here.
          </Alert>
        }
        {!isFetching && data.length === 0 &&
          <Alert bsStyle="success">No results.</Alert>
        }
        {data.length > 0 && arrayName != 'big_6' && arrayName != 'dimensions' &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div>
              <div className="affect--emotion_set-title">{primaryAlert}</div>
              <div className="affect--display_main-area-wrapper">
                <div className="affect--display_main-area">
                  {primaryArea}
                </div>
              </div>
              <br></br>
              <div className="affect--emotion_set-title">{secondaryAlert}</div>
              <div className="affect--display_main-area-wrapper">
                <div className="affect--display_main-area">
                  {secondaryArea}
                </div>
              </div>
            </div>
          </div>
        }
        {data.length > 0 && ( arrayName == 'big_6' || arrayName == 'dimensions') &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div>
              <div className="affect--emotion_set-title">{primaryAlert}</div>
              <div className="affect--display_main-area-wrapper">
                <div className="affect--display_main-area">
                  {primaryArea}
                </div>
              </div>
            </div>
          </div>
        }
        <div style={{fontSize: '10px'}}>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </div>
      </div>
    );
  }
}

NLPComprehensiveTable.propTypes = {
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data
  } = dataByDataset['nlp'] || {
    isFetching: true,
    items: []
  };

  return {
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(NLPComprehensiveTable);
