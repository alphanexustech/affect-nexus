import axios from 'axios'
import { microservices } from '../config/microservices'

const assistantURL = 'http://' + microservices.assistantServer + ':' + microservices.assistantPort;

export const SIGNUP_REQUEST = 'USERS_SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'USERS_SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'USERS_SIGNUP_FAILURE';

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';

export const LOGOUT = 'USERS_LOGOUT';

export const userActions = {
  login,
  logout,
  signup
};

function login(user) {
  return dispatch => {
    dispatch(request(user));

    let payload = user
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
    axios.post(assistantURL + '/users/login', payload, config)
    .then(function (response) {
      let token = response.data.accessToken
      let userID = response.data.userID
      let username = response.data.username
      if (token) {
        dispatch(success(user));
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userID);
        localStorage.setItem('username', username);
        window.location.href = '/nexus'
      } else {
        dispatch(failure(response));
        console.log('EXCEPTIONAL FAILURE');
      }
    })
    .catch(function (error) {
      dispatch(failure(error));
      if (error.response.status == 401) {
        // IDEA: Handle the error visually to improve UX
      }
    });
  };

  function request(user) { return { type: LOGIN_REQUEST, user } }
  function success(user) { return { type: LOGIN_SUCCESS, user } }
  function failure(error) { return { type: LOGIN_FAILURE, error } }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
  localStorage.removeItem('username');
  return { type: LOGOUT };
}

function signup(user) {
  return dispatch => {
    dispatch(request(user));
    let payload = user
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
    axios.post(assistantURL + '/users/signup', payload, config)
    .then(function (response) {
      let token = response.data.accessToken
      let userID = response.data.userID
      let username = response.data.username
      if (token) {
        dispatch(success(user));
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userID);
        localStorage.setItem('username', username);
        window.location.href = '/nexus'
      } else {
        dispatch(failure(response));
        console.log('EXCEPTIONAL FAILURE');
      }
    })
    .catch(function (error) {
      dispatch(failure(error));
      // IDEA: Handle the error visually to improve UX
    });
  };

  function request(user) { return { type: SIGNUP_REQUEST, user } }
  function success(user) { return { type: SIGNUP_SUCCESS, user } }
  function failure(error) { return { type: SIGNUP_FAILURE, error } }
}
