import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'

import { Table, Alert } from 'react-bootstrap';

export default class NLPMinRankTable extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let array = this.props.data;
    let totalScore = 0;
    let topFiveEmotions = []
    for (var i = 0; i < 5; i++) {
        // Get the total score for calculating percentages
        totalScore += array[i].normalized_r_score;
    }

    for (var i = 0; i < 5; i++) {
        if (array[i].normalized_r_score > 0) {
          topFiveEmotions.push(
            <tr key={i + 'emotionRank'}>
              <td style={{width: '70%'}}>
                <div className="affect--display_name">
                    {array[i] ? array[i].emotion : 'Error'}
                </div>
              </td>
              <td style={{width: '30%'}}>
                <div className="affect--display_rank">
                    {array[i] ? Math.round(array[i].normalized_r_score / totalScore * 100) + '%': 'Error'}
                </div>
              </td>
            </tr>
          )
        } else if (i == 0) {
          topFiveEmotions.push(
            <tr key={i + 'emotionRank'}>
              <td style={{width: '70%'}}>
                <div className="affect--display_name">
                    {array[i] ? 'No emotions' : 'Error'}
                </div>
              </td>
              <td style={{width: '30%'}}>
                <div className="affect--display_rank">
                    --
                </div>
              </td>
            </tr>
          )
        } else {
          topFiveEmotions.push(
            <tr key={i + 'emotionRank'}>
              <td style={{width: '70%'}}>
                <div className="affect--display_name">
                    {array[i] ? '--' : 'Error'}
                </div>
              </td>
              <td style={{width: '30%'}}>
                <div className="affect--display_rank">
                    --
                </div>
              </td>
            </tr>
          )
        }
    }
    return (
      <div>
        <div style={{color: '#CCCCCC', textAlign: 'center'}}>(Strongest)</div>
        <Table style={{fontSize: '14px', margin: 'auto'}} condensed>
          <tbody>
            {topFiveEmotions}
          </tbody>
        </Table>
        <div style={{color: '#CCCCCC', textAlign: 'center'}}>(Weaker)</div>
      </div>
    );
  }
}
