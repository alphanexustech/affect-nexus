import React from 'react';

import DivListGroup from '../groups/DivListGroup'
import DivList from '../lists/DivList'
import StatisticGroup from '../groups/StatisticGroup'
import AffectUnprocessedRowTableGroup from '../groups/AffectUnprocessedRowTableGroup'
import AffectStemmedRowTableGroup from '../groups/AffectStemmedRowTableGroup'
import AffectLemmatizedRowTableGroup from '../groups/AffectLemmatizedRowTableGroup'
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
    localStorage.setItem('lastEmotion', JSON.stringify(d));
    localStorage.setItem('lastEmotionText', this.props.doc);
    localStorage.setItem('lastEmotionCreationDate', new Date());
  }

  render () {

    let array = this.props.array;
    let i = this.props.iterator;

    return (
      <div key={array[i] ? array[i].emotion : 'Error' + '-group'} className="affect-display_emotion">
        <div className='pull-left'>
          <div>
            <span key={i + '-r-affect'} className="affect--display_name">
              {array[i] ? array[i].emotion : 'Error'}
            </span>
            <span className="affect--display_rank">
              {i + 1}
            </span>
          </div>
          <div className="affect--display_scores">
            <span key={i + '-normal-scores'}>
              {array[i] ? array[i].normalized_r_score.toFixed(4) : 'Error'}
            </span>
            <span style={{marginLeft: '2px', color: '#AAA'}}>
              (<i>{array[i] ? array[i].normalized_r_score.toFixed(4) : 'Error'}</i>)
            </span>
          </div>
          <div>
            <Link
              to="/nlp-radiant"
              className="btn btn-xs btn-primary"
              onClick={this.handleClick.bind(this, array[i])}
              >
              <i className="fa fa-bolt" aria-hidden="true"></i>
              Radiant
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
              <AffectUnprocessedRowTableGroup data={array[i]} limitList={1}></AffectUnprocessedRowTableGroup>
              <AffectStemmedRowTableGroup data={array[i]} limitList={1}></AffectStemmedRowTableGroup>
              <AffectLemmatizedRowTableGroup data={array[i]} limitList={1}></AffectLemmatizedRowTableGroup>
              <AffectCorpusLengthRowTableGroup data={array[i]}></AffectCorpusLengthRowTableGroup>
              <AffectNormalizedScoreRowTableGroup data={array[i]}></AffectNormalizedScoreRowTableGroup>
          </tbody>
        </Table>
      </div>
    );

  }
}
