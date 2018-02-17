import axios from 'axios'
import { microservices } from '../config/microservices'

const assistantURL = microservices.protocol + '://' + microservices.assistantServer + ':' + microservices.assistantPort;

export const SIGNUP_REQUEST = 'USERS_SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'USERS_SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'USERS_SIGNUP_FAILURE';

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';

export const SETTINGS_REQUEST = 'USERS_SETTINGS_REQUEST';
export const SETTINGS_SUCCESS = 'USERS_SETTINGS_SUCCESS';
export const SETTINGS_FAILURE = 'USERS_SETTINGS_FAILURE';

export const UPDATE_REQUEST = 'USERS_UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'USERS_UPDATE_FAILURE';

export const DELETE_PROFILE = 'USERS_DELETE_PROFILE';

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
      let displayName = response.data.displayName
      let interfaceComplexity = response.data.interfaceComplexity
      if (token) {
        dispatch(success(user));
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userID', userID);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('displayName', displayName);
        sessionStorage.setItem('interfaceComplexity', interfaceComplexity);
        window.location.href = '/nexus'
      } else {
        handleError(response)
      }
    })
    .catch(function (error) {
      handleError(error)
    });

    function handleError(error) {
      let uxFriendlyError = '';
      if (error.response) {
        let data = error.response.data
        if (error.response.status == 401) {
          uxFriendlyError = data.errors
        } else {
          uxFriendlyError = 'Sorry, there was a server error. We\'ll fix the problem when we find it.'
        }
        dispatch(failure(uxFriendlyError));
      } else {
        uxFriendlyError = 'Sorry, we couldn\'t connect to the server.'
        dispatch(failure(uxFriendlyError));
      }
    }

  };
  function request(user) { return { type: LOGIN_REQUEST, user } }
  function success(user) { return { type: LOGIN_SUCCESS, user } }
  function failure(error) { return { type: LOGIN_FAILURE, error } }
}

function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userID');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('interfaceComplexity');
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
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userID', userID);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('interfaceComplexity', "0"); // Simple UI for starters
        window.location.href = '/optin' // Redirect
      } else {
        handleError(response)
      }
    })
    .catch(function (error) {
      handleError(error)
    });

    function handleError(error) {
      let uxFriendlyError = '';
      if (error.response) {
        if (error.response.status == 401) {
          let data = error.response.data
          if (data.errors.email) { // Handle the E-mail validation server side
            uxFriendlyError = data.errors.email.msg
          } else {
            uxFriendlyError = data.errors
          }
        } else {
          uxFriendlyError = 'Sorry, there was a server error. We\'ll fix the problem when we find it.'
        }
        dispatch(failure(uxFriendlyError));
      } else {
        uxFriendlyError = 'Sorry, we couldn\'t connect to the server.'
        dispatch(failure(uxFriendlyError));
      }
    }

  };
  function request(user) { return { type: SIGNUP_REQUEST, user } }
  function success(user) { return { type: SIGNUP_SUCCESS, user } }
  function failure(error) { return { type: SIGNUP_FAILURE, error } }
}

export function receiveSettingsData() {
  return dispatch => {
    dispatch(request('Settings Requested')) // This is passing a status
    let token = sessionStorage.getItem('token')

    let url = assistantURL + `/users/account`
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Authorization": 'Bearer ' + token // Set authorization header
      }
    }
    axios.get(url, config)
    .then(function (response) {
      let user = response.data.user
      dispatch(success(user))
      // Update interfaceComplexity settings in sessionStorage
      sessionStorage.setItem('interfaceComplexity', user.interfaceComplexity);
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
  function request(status) { return { type: SETTINGS_REQUEST, status } }
  function success(user) { return { type: SETTINGS_SUCCESS, user } }
  function failure(error) { return { type: SETTINGS_FAILURE, error } }
}

// This isn't in the reducer because it is a PATCH function for the user model
export function userSettingsUpdate(user) {
  return dispatch => {
    dispatch(request(user))
    let token = sessionStorage.getItem('token')

    let url = assistantURL + `/users/account`
    let payload = user
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Authorization": 'Bearer ' + token // Set authorization header
      }
    }
    axios.patch(url, payload, config)
    .then(function (response) {
      let user = response.data.user
      dispatch(success(user))
      dispatch(receiveSettingsData())

    })
    .catch(function (error) {
      handleError(error)
    });

    function handleError(error) {
      let uxFriendlyError = '';
      if (error.response) {
        let data = error.response.data
        if (error.response.status == 400) {
          if (data.errors) {
            if (data.errors.confirmPassword) {
              uxFriendlyError = data.errors.confirmPassword.msg
            }
          }
        } else if (error.response.status == 401) {
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

  function request(user) { return { type: UPDATE_REQUEST, user } }
  function success(user) { return { type: UPDATE_SUCCESS, user } }
  function failure(error) { return { type: UPDATE_FAILURE, error } }
}

export function deleteProfile() {
  return dispatch => {
    dispatch(request('Delete Profile Requested')) // This is passing a status
    let token = sessionStorage.getItem('token')

    let url = assistantURL + `/users/account/delete`
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Authorization": 'Bearer ' + token // Set authorization header
      }
    }
    axios.delete(url, config)
    .then(function (response) {
      let user = response.data.user
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userID');
      sessionStorage.removeItem('username');
      window.location.href = '/'
      dispatch(success(user))
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
  function request(status) { return { type: SETTINGS_REQUEST, status } }
  function success(user) { return { type: DELETE_PROFILE, user } }
  function failure(error) { return { type: SETTINGS_FAILURE, error } }
}
