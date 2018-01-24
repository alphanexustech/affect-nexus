import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DivListGroup from '../groups/DivListGroup'
import NLPListItem from '../listitems/NLPListItem'
import GeneralErrorComponent from '../errors/GeneralErrorComponent'

import { Row, Col, Table, Alert, Panel, ListGroup, Pagination } from 'react-bootstrap';

import { fetchDataIfNeeded } from '../../actions/actions';

class NLPNexusList extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      "activePage": 1
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let metadata = {
      'page': 1,
      'countPerPage': 5,
    }
    dispatch(fetchDataIfNeeded('nlp-analyses', '3000', metadata));
  }

  handleSelect(eventKey) {
    const { dispatch } = this.props;
    this.setState({
      activePage: eventKey
    });
    let metadata = {
      'page': eventKey,
      'countPerPage': 5,
    }
    dispatch(fetchDataIfNeeded('nlp-analyses', '3000', metadata));
  }

  render () {
    const { data, metadata, isFetching, lastUpdated } = this.props;

    let nlplistitems = [];
    if (this.props.data.length > 0) {
      let data = this.props.data;
      for (var i = 0; i < data.length; i++) {
        nlplistitems.push(
          <NLPListItem key={'card-' + i} data={data[i]}/>
        )
      }

    }

    return (
      <div>
        {isFetching && this.props.error &&
          <GeneralErrorComponent error={this.props.error} />
        }
        { !this.props.error &&
          <div>

            <div className="nexus--emotion_set-title">
              Most recent processes
            </div>
            <div className="nexus--display_main-area-wrapper">
              {isFetching && data.length === 0 && !this.props.error &&
                <div style={{padding: "10px"}}>Loading...</div>
              }
              {!isFetching && data.length === 0 && !this.props.error &&
                <div style={{padding: "10px"}}>{nlplistitems}Your most recent processes are shown here. Right now you don't have any! Why not run one?</div>
              }
              {data.length > 0 &&
                <div>
                  <Row>
                    <Col lg={12}>
                      <div className="pull-right">
                        <Pagination
                          prev
                          next
                          first
                          last
                          ellipsis
                          boundaryLinks
                          items={parseInt(this.props.metadata.totalPages)}
                          maxButtons={5}
                          activePage={this.state.activePage}
                          onSelect={this.handleSelect} />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <ListGroup>
                        {nlplistitems}
                      </ListGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="pull-right">
                        <Pagination
                          prev
                          next
                          first
                          last
                          ellipsis
                          boundaryLinks
                          items={parseInt(this.props.metadata.totalPages)}
                          maxButtons={5}
                          activePage={this.state.activePage}
                          onSelect={this.handleSelect} />
                      </div>
                    </Col>
                  </Row>
                </div>
              }
            </div>
            <div className="nexus--emotion_set-footer" style={{fontSize: "12px", textAlign: "right"}}>
              Currently showing five processes
            </div>
          </div>
        }
      </div>
    );
  }
}

NLPNexusList.propTypes = {
  data: PropTypes.array.isRequired,
  metadata: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { dataByDataset } = state;
  if (dataByDataset['error']) {
    return {
      error: dataByDataset['error'],
      lastUpdated: null,
      isFetching: true,
      data: [],
      metadata: {}
    }
  } else {
    const { isFetching, lastUpdated,
            items: data, metadata: metadata
          } = dataByDataset['nlp-analyses'] || {
            isFetching: true, items: [], metadata: {}
          };

    return {
      data,
      metadata,
      isFetching,
      lastUpdated
    };
  }
}

export default connect(mapStateToProps)(NLPNexusList);
