import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Alert, Row, Col, ListGroupItem, Well, Table } from 'react-bootstrap';

import NLPMinRankTable from '../tables/NLPMinRankTable';

import { loadNLPAnalysis } from '../../actions/actions';

import moment from 'moment';

class NLPListItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let data = this.props.data

    let array = data.emotion_set.sort(function(a,b) {
                    return b.normalized_r_score - a.normalized_r_score || alphaSortEmotion(a,b);
                });

    function alphaSortEmotion(a, b) {
      if(a.emotion < b.emotion) return -1;
      if(a.emotion > b.emotion) return 1;
      return 0;
    }

    function titleCase(str) {
       let strList = str.toLowerCase().split('_');

       for(var i = 0; i < strList.length; i++){
           switch (strList[i]) {
             case 'fsre':
               strList[i] = strList[i].toUpperCase();
               break;
             case 'occ':
               strList[i] = strList[i].toUpperCase();
               break;
             case 'ml':
               strList[i] = 'Markup Language';
               break;
             default:
               strList[i] = strList[i].split('');
               strList[i][0] = strList[i][0].toUpperCase();
               strList[i] = strList[i].join('');
           }
       }
       return strList.join(' ');
    }

    return (
      <ListGroupItem>
        <div style={{fontSize: "14px"}}>
          <Row style={{
              paddingBottom: "12px",
              paddingTop: "12px"
            }}>
            <Col sm={4} md={4} lg={4}>
              <div>
                <div className="">
                  <NLPMinRankTable data={array}/>
                </div>
              </div>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <div style={{
                   padding: "24px",
                   display: "flex",
                   flexDirection: "column",
                   justifyContent: "space-between"
                 }}>
                 <div style={{color: '#CCCCCC', textAlign: 'right'}}>
                   {moment(moment(data.date[0], "YYYY-MM-DD HH:mm:ss.SSS"), "YYYY").format("ddd, MMM DD, YYYY hh:mm A") + " (GMT)"}
                 </div>
                 <div>
                   <div style={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      minHeight: '240px',
                      maxHeight: '320px'
                     }}>
                     {data.doc}
                   </div>
                 </div>
              </div>
            </Col>
            <Col sm={12} md={12} lg={12}>
              <div style={{textAlign: "center", color: "#CCCCCC"}}>
                Including only the five strongest emotions, here are their relative strengths.
              </div>
            </Col>
          </Row>
        </div>
      </ListGroupItem>
    );

  }

}

NLPListItem.propTypes = {
  metadata: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data,
    metadata: metadata
  } = dataByDataset['nlp-analyses'] || {
    isFetching: true,
    items: [],
    metadata: {}
  };

  return {
    metadata,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(NLPListItem);
