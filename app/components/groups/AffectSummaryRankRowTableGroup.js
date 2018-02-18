import React from 'react';

import DivList from '../lists/DivList'

export default class AffectSummaryRankRowTableGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let array = this.props.data;
    let i = this.props.iterator;
    let totalScore = this.props.totalScore;

    let emotionRow = (
      <div>Hellow world</div>
    );

    if (array[i].normalized_r_score > 0) {
      emotionRow = (
        <tr key={i + '-affect-row'}>
          <td style={{width: '60%'}}>
            <div className="affect--display_name">
                {array[i] ? array[i].emotion : 'Error'}
            </div>
          </td>
          <td style={{width: '20%'}}>
            <div className="affect--display_rank">
                {array[i] ? Math.round(array[i].normalized_r_score / totalScore * 100) + '%': 'Error'}
            </div>
          </td>
          <td style={{width: '20%'}}>
            <div className="affect--display_scores" key={i + '-normal-scores'}>
                {array[i] ? array[i].normalized_r_score.toFixed(4) : 'Error'}
            </div>
          </td>
        </tr>
      )
    } else if (i == 0) {
      emotionRow = (
        <tr key={i + '-affect-row'}>
          <td style={{width: '60%'}}>
            <div className="affect--display_name">
                {array[i] ? 'No emotions' : 'Error'}
            </div>
          </td>
          <td style={{width: '20%'}}>
            <div className="affect--display_rank">
                --
            </div>
          </td>
          <td style={{width: '20%'}}>
            <div className="affect--display_scores" key={i + '-normal-scores'}>
                {array[i] ? array[i].normalized_r_score.toFixed(4) : 'Error'}
            </div>
          </td>
        </tr>
      )
    } else {
      emotionRow = (
        <tr key={i + '-affect-row'}>
            <td style={{width: '60%'}}>
              <div className="affect--display_name">
                  {array[i] ? '--' : 'Error'}
              </div>
            </td>
            <td style={{width: '20%'}}>
              <div className="affect--display_rank">
                  --
              </div>
            </td>
            <td style={{width: '20%'}}>
              <div className="affect--display_scores" key={i + '-normal-scores'}>
                  {array[i] ? array[i].normalized_r_score.toFixed(4) : 'Error'}
              </div>
            </td>
          </tr>
        )
    }


    return (
      emotionRow
    );

  }
}
