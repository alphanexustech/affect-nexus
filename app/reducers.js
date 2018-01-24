import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
  REQUEST_DATA, RECEIVE_DATA, REQUEST_FAILURE,
  START_LOAD, END_LOAD
} from './actions/actions';

import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
} from './actions/userActions';

/*
 * Authentication defintions
 */
let user = JSON.parse(localStorage.getItem('user'));
const initialAuthState = user ? { loggedIn: true, user } : {};

function data(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  metadata: {}
}, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.data,
        metadata: action.metadata,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function dataByDataset(state = { }, action) {
  switch (action.type) {
    case RECEIVE_DATA:
    case REQUEST_DATA:
      return Object.assign({}, state, {
        [action.dataset]: data(state[action.dataset], action)
      });
    case REQUEST_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}

function load(state = {}, action) {
  switch (action.type) {
    case START_LOAD:
      return {
        loading: true
      }
    case END_LOAD:
      return {
        loading: false
      }
    default:
      return state
  }
}

function signup(state = {}, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        registering: true
      };
    case SIGNUP_SUCCESS:
      return {};
    case SIGNUP_FAILURE:
      return {
        error: action.error
      };
    case LOGOUT:
      return {};
    default:
      return state
  }
}

function authentication(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case LOGIN_FAILURE:
    console.log(action);
      return {
        error: action.error
      };
    case LOGOUT:
      return {};
    default:
      return state
  }
}

const rootReducer = combineReducers({
  signup,
  authentication,
  dataByDataset,
  load,
  form: formReducer     // <---- Mounted at 'form'
});

export default rootReducer;
