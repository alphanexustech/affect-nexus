import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

import { Table, Alert } from 'react-bootstrap';

import AffectSummaryRankRowTableGroup from '../groups/AffectSummaryRankRowTableGroup'

class NLPRankTable extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { data, isFetching, lastUpdated } = this.props;

    var primaryArea = '',
        secondaryArea = '',
        primaryAlert = '',
        arrayName = '';

    if (this.props.data.length > 0) {
      primaryArea = [];
      secondaryArea = [];
      primaryAlert = 'Ranking Summary of the Emotion Set\'s Top 10'; // Old message
      primaryAlert = 'Including only the ten strongest emotions, here are their relative strengths.';
      let targetData = this.props.data[0].data
      arrayName = targetData.name
      let array = targetData.emotion_set.sort(function(a,b) {
                      return b.normalized_r_score - a.normalized_r_score || alphaSortEmotion(a,b);
                  });

      function alphaSortEmotion(a, b) {
        if(a.emotion < b.emotion) return -1;
        if(a.emotion > b.emotion) return 1;
        return 0;
      }

      let totalScoreSIX = 0;
      let totalScoreTEN = 0;

      for (var i = 0; i < 6; i++) {
          // Get the total score for calculating percentages
          totalScoreSIX += array[i].normalized_r_score;
      }

      if (array.length > 9) {
        for (var i = 0; i < 10; i++) {
            // Get the total score for calculating percentages
            totalScoreTEN += array[i].normalized_r_score;
        }
      }

      switch (arrayName) {
        case 'big_6':
          primaryAlert = 'Relative Strengths of Emotions based on Paul Ekman\'s "Big Six"';
          for (var i = 0; i < 6; i++) {
            primaryArea.push(
              <AffectSummaryRankRowTableGroup key={i + '-affect-lagger-row'} data={array} iterator={i} totalScore={totalScoreSIX}></AffectSummaryRankRowTableGroup>
            )
          }
          break;
        case 'dimensions':
          primaryAlert = 'Relative Strengths of Emotions based on Dimensions';
          for (var i = 0; i < 6; i++) {
            primaryArea.push(
              <AffectSummaryRankRowTableGroup key={i + '-affect-lagger-row'} data={array} iterator={i} totalScore={totalScoreSIX}></AffectSummaryRankRowTableGroup>
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
              <AffectSummaryRankRowTableGroup key={i + '-affect-lagger-row'} data={array} iterator={i} totalScore={totalScoreTEN}></AffectSummaryRankRowTableGroup>
            )
          }
          break;
      }
      // End switch
    }
    return (
      <div>
        {isFetching && data.length === 0 &&
          <div style={{textAlign: 'center'}}>The strongest emotional signals are shown here.</div>
        }
        {!isFetching && data.length === 0 &&
          <div style={{textAlign: 'center'}}>No results.</div>
        }
        {data.length > 0 && data[0].name != 'big_6' &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div style={{ textAlign: 'center' }}>
              <Alert bsStyle="success">{primaryAlert}</Alert>
              <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}} condensed>
                <tbody>
                {primaryArea}
                </tbody>
              </Table>
            </div>
          </div>
        }
        {data.length > 0 && data[0].name == 'big_6' &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div style={{ textAlign: 'center' }}>
              <Alert bsStyle="success">{primaryAlert}</Alert>
              <Table style={{fontSize: '12px', margin: 'auto', textAlign: 'center'}} condensed>
                <tbody>
                {primaryArea}
                </tbody>
              </Table>
            </div>
          </div>
        }
      </div>
    );
  }
}

NLPRankTable.propTypes = {
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

export default connect(mapStateToProps)(NLPRankTable);
