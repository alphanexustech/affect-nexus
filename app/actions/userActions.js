import axios from 'axios'
import { microservices } from '../config/microservices'

const assistantURL = 'http://' + microservices.assistantServer + ':' + microservices.assistantPort;

export const userConstants = {
    SIGNUP_REQUEST: 'USERS_SIGNUP_REQUEST',
    SIGNUP_SUCCESS: 'USERS_SIGNUP_SUCCESS',
    SIGNUP_FAILURE: 'USERS_SIGNUP_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    LOGOUT: 'USERS_LOGOUT',
};


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
            window.location.href = '/overview'
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

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    return { type: userConstants.LOGOUT };
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
            window.location.href = '/overview'
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

    function request(user) { return { type: userConstants.SIGNUP_REQUEST, user } }
    function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}
