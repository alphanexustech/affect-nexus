import React from 'react';

import DivListGroup from '../groups/DivListGroup'
import DivList from '../lists/DivList'
import StatisticGroup from '../groups/StatisticGroup'
import AffectCorpusLengthRowTableGroup from '../groups/AffectCorpusLengthRowTableGroup'
import AffectNormalizedScoreRowTableGroup from '../groups/AffectNormalizedScoreRowTableGroup'

import { Link } from 'react-router-dom';
import { Table, Alert } from 'react-bootstrap';

export default class NLPComprehensiveTableModule extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(d) {
    sessionStorage.setItem('lastEmotion', JSON.stringify(d));
    sessionStorage.setItem('lastEmotionText', this.props.doc);
    sessionStorage.setItem('lastEmotionCreationDate', new Date());
  }

  render () {

    let array = this.props.array;
    let i = this.props.iterator;

    return (
      <div key={array[i].emotion + '-group'} className="affect-display_emotion">
        <div className='pull-left'>
          <div>
            <span key={i + '-r-affect'} className="affect--display_name">
              {array[i].emotion}
            </span>
            <span className="affect--display_rank">
              {i + 1}
            </span>
          </div>
          <div className="affect--display_scores">
            <span key={i + '-normal-scores'}>
              <i className="fa fa-star" aria-hidden="true"></i> {array[i].normalized_r_score.toFixed(4)}
            </span>
          </div>
          <div>
            <Link
              to="/insight"
              className="btn btn-xs btn-primary"
              onClick={this.handleClick.bind(this, array[i])}
              >
              <i className="fa fa-bolt" aria-hidden="true"></i>
              Insight
            </Link>
          </div>
        </div>
        <Table condensed key={i + '-table'} style={{
            fontSize: '12px',
            marginLeft: '20%',
            textAlign: 'left',
            width: '80%',
            tableLayout: 'fixed',
          }}>
          <thead>
            <tr>
              <th></th>
              <th>I Words</th>
              <th>II Words</th>
              <th>III Words</th>
              <th>I-II Words</th>
              <th>I-III Words</th>
              <th>II-III Words</th>
              <th>I-II-III Words</th>
            </tr>
          </thead>
          <tbody>
            <AffectCorpusLengthRowTableGroup data={array[i]}></AffectCorpusLengthRowTableGroup>
            <AffectNormalizedScoreRowTableGroup data={array[i]}></AffectNormalizedScoreRowTableGroup>
          </tbody>
        </Table>
      </div>
    );

  }
}
