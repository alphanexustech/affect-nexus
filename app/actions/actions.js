import fetch from 'isomorphic-fetch';

export const REQUEST_DATA = 'REQUEST_DATA';
function requestData(dataset) {
  return {
    type: REQUEST_DATA,
    dataset
  };
}

export const RECEIVE_DATA = 'RECEIVE_DATA';
function receiveData(dataset, json) {

  let data = [json] // makes this an array so that the mapstatetoprops is happy
  let metadata = {}

  return {
    type: RECEIVE_DATA,
    dataset,
    data: data,
    metadata: metadata,
    receivedAt: Date.now()
  };
}

// IDEA: Make the rest of the boilerplate actions.
