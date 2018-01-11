import axios from 'axios'
import { microservices } from '../config/microservices'

const assistantURL = 'http://' + microservices.assistantServer + ':' + microservices.assistantPort;
const collection = microservices.mongoCollection

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';

function requestData(dataset) {
  return {
    type: REQUEST_DATA,
    dataset
  };
}

function receiveData(dataset, json) {

  let data = [json] // makes this an array so that the mapstatetoprops is happy
  let metadata = {}
  if (dataset == 'nlp-analyses') {
    data = json.data
    metadata['totalAnalyses'] = json['total_analyses']
    metadata['countPerPage'] = json['count_per_page']
    metadata['totalPages'] = Math.ceil(json['total_analyses'] / json['count_per_page'])
  }
  else if (dataset !== 'nlp') {
    data = json.all
  }

  return {
    type: RECEIVE_DATA,
    dataset,
    data: data,
    metadata: metadata,
    receivedAt: Date.now()
  };
}

function submitRequest(values) {
  return {
    type: SUBMIT_REQUEST,
    values,
    receivedAt: Date.now()
  };
}

function fetchData(dataset, port, metadata) {
  return dispatch => {
    dispatch(requestData(dataset));
    let token = localStorage.getItem('token')

    let url = assistantURL + `/scorer/analyses`
        url += `/` + collection
        url += `/` + metadata.page
        url += `/` + metadata.countPerPage
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Authorization": 'Bearer ' + token // Set authorization header
      }
    }
    axios.get(url, config)
    .then(function (response) {
      let json = response.data.data
      dispatch(receiveData(dataset, json))
    })
    .catch(function (error) {
      // IDEA: Handle error
      console.log(error);
    });
  };
}

function shouldFetchData(state, dataset) {
  const data = state.dataByDataset[dataset];
  if (!data) {
    return true;
  } else if (data.isFetching) {
    return false;
  } else {
    return data.didInvalidate;
  }
}

export function fetchDataIfNeeded(dataset, port, metadata) {
  return (dispatch, getState) => {
    let alwaysInvalidate = ['nlp-analyses']
    if (alwaysInvalidate.indexOf(dataset) >= 0) {
      return dispatch(fetchData(dataset, port, metadata));
    }
    else if (shouldFetchData(getState(), dataset, metadata)) {
      return dispatch(fetchData(dataset, port, metadata));
    }
  };
}

export function nlpSubmit(data) {
  return dispatch => {
    dispatch(submitRequest(data))
    let token = localStorage.getItem('token')

    let url = assistantURL + `/scorer/analyze_emotion_set`
    let payload = data
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Authorization": 'Bearer ' + token // Set authorization header
      }
    }
    axios.post(url, payload, config)
    .then(function (response) {
      let json = response.data.data
      dispatch(receiveData('nlp', json))
    })
    .catch(function (error) {
      // IDEA: Handle error
      console.log(error);
    });

  }
}

export function loadNLPAnalysis(data) {
  return dispatch => {
    dispatch(submitRequest(data))
    let token = localStorage.getItem('token')

    let url = assistantURL + `/scorer/analyses`
    url += `/` + collection
    url += `/` + data.analysis_id
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Authorization": 'Bearer ' + token // Set authorization header
      }
    }
    axios.get(url, config)
    .then(function (response) {
      let json = response.data.data
      dispatch(receiveData('nlp', json))
    })
    .catch(function (error) {
      // IDEA: Handle error
      console.log(error);
    });
  }
}
