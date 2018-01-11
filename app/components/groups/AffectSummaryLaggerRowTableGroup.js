import React from 'react';

import DivList from '../lists/DivList'

export default class AffectSummaryLaggerRowTableGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {

    let array = this.props.data;
    let i = this.props.iterator;

    return (
      <tr key={i + '-affect-row'}>
        <td>
          <div className="affect--display_name" key={i + '-r-affect'}>
            {array[i] ? array[i].emotion : 'Error'}
          </div>
        </td>
        <td>
          <div className="affect--display_rank" key={i + '-r-rank'}>
              {array.length - i}
          </div>
        </td>
        <td>
          <div className="affect--display_scores" key={i + '-normal-scores'}>
            {array[i] ? array[i].normalized_r_score.toFixed(4) : 'Error'}
          </div>
        </td>
      </tr>
    );

  }
}
