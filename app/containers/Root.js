import React, { Component } from 'react';
import { Route, Router, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import AsyncApp from './AsyncApp';


const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        {
          <BrowserRouter>
            <AsyncApp/>
          </BrowserRouter>
        }
      </Provider>
    );
  }
}
