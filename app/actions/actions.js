import axios from 'axios'
import { microservices } from '../config/microservices'
import { userActions } from './userActions';

const assistantURL = microservices.protocol + '://' + microservices.assistantServer + ':' + microservices.assistantPort;
const collection = microservices.mongoCollection

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';

export const START_LOAD = 'START_LOAD';
export const END_LOAD = 'END_LOAD';

function requestData(dataset) {
  return {
    type: REQUEST_DATA,
    dataset
  };
}

function requestFailure(error) {
  return {
    type: REQUEST_FAILURE,
    error
  }
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
    let token = sessionStorage.getItem('token')

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
      handleError(error)
    });

    function handleError(error) {
      let uxFriendlyError = '';
      if (error.response) {
        let data = error.response.data
        if (error.response.status == 401) {
          if (data.errors) {
            uxFriendlyError = data.errors
          } else if (data == 'Unauthorized') {
            uxFriendlyError = 'Your log in credentials are old. Please log in. We\'ll help you out.'
            setTimeout( function() {
              userActions.logout()
              window.location.href = '/login' // Redirect
            }, 3000);
          } else {
            console.error(data);
            uxFriendlyError = 'Sorry, there was a server error. We\'ll fix the problem when we find it.'
          }
        } else {
          console.error(data);
          uxFriendlyError = 'Sorry, there was a server error. We\'ll fix the problem when we find it.'
        }
        dispatch(failure(uxFriendlyError));
      } else {
        uxFriendlyError = 'Sorry, we couldn\'t connect to the server.'
        dispatch(failure(uxFriendlyError));
      }
    }
  };

  function failure(error) { return requestFailure(error) }
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

function startLoad(data) {
  return {
    type: START_LOAD,
    data
  };
}

function endLoad(data) {
  return {
    type: END_LOAD,
    data
  };
}

export function nlpSubmit(data, simpleOrAdvanced) {
  return dispatch => {
    dispatch(submitRequest(data))
    let token = sessionStorage.getItem('token')

    let url = assistantURL + `/scorer/analyze_emotion_set`
    let payload = data
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Authorization": 'Bearer ' + token // Set authorization header
      }
    }
    dispatch(startLoad(data));
    axios.post(url, payload, config)
    .then(function (response) {
      let json = response.data.data
      dispatch(receiveData('nlp', json))
      // Redirect if it is the simple page
      if (simpleOrAdvanced == 'simple') {
        window.location.href = '/nexus'
        setTimeout(function () {
          dispatch(endLoad(data));
        }, 1000);
      } else {
        dispatch(endLoad(data));
      }
    })
    .catch(function (error) {
      handleError(error)
      dispatch(endLoad(data));
    });

    function handleError(error) {
      let uxFriendlyError = '';
      if (error.response) {
        let data = error.response.data
        if (error.response.status == 401) {
          if (data.errors) {
            uxFriendlyError = data.errors
          } else if (data == 'Unauthorized') {
            uxFriendlyError = 'Your log in credentials are old. Please log in. We\'ll help you out.'
            setTimeout( function() {
              userActions.logout()
              window.location.href = '/login' // Redirect
            }, 3000);
          } else {
            console.error(data);
            uxFriendlyError = 'Sorry, there was a server error. We\'ll fix the problem when we find it.'
          }
        } else {
          console.error(data);
          uxFriendlyError = 'Sorry, there was a server error. We\'ll fix the problem when we find it.'
        }
        dispatch(failure(uxFriendlyError));
      } else {
        uxFriendlyError = 'Sorry, we couldn\'t connect to the server.'
        dispatch(failure(uxFriendlyError));
      }
    }
  };

  function failure(error) { return requestFailure(error) }
}

export function loadNLPAnalysis(data) {
  return dispatch => {
    dispatch(submitRequest(data))
    let token = sessionStorage.getItem('token')

    let url = assistantURL + `/scorer/analyses`
    url += `/` + collection
    url += `/` + data.analysis_id
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Authorization": 'Bearer ' + token // Set authorization header
      }
    }
    dispatch(startLoad(data));
    axios.get(url, config)
    .then(function (response) {
      let json = response.data.data
      dispatch(receiveData('nlp', json))
      dispatch(endLoad(data));
    })
    .catch(function (error) {
      handleError(error)
      dispatch(endLoad(data));
    });

    function handleError(error) {
      let uxFriendlyError = '';
      if (error.response) {
        let data = error.response.data
        if (error.response.status == 401) {
          if (data.errors) {
            uxFriendlyError = data.errors
          } else if (data == 'Unauthorized') {
            uxFriendlyError = 'Your log in credentials are old. Please log in. We\'ll help you out.'
            setTimeout( function() {
              userActions.logout()
              window.location.href = '/login' // Redirect
            }, 3000);
          } else {
            console.error(data);
            uxFriendlyError = 'Sorry, there was a server error. We\'ll fix the problem when we find it.'
          }
        } else {
          console.error(data);
          uxFriendlyError = 'Sorry, there was a server error. We\'ll fix the problem when we find it.'
        }
        dispatch(failure(uxFriendlyError));
      } else {
        uxFriendlyError = 'Sorry, we couldn\'t connect to the server.'
        dispatch(failure(uxFriendlyError));
      }
    }
  };

  function failure(error) { return requestFailure(error) }
}
