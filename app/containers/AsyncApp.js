import fetch from 'isomorphic-fetch';

import '../css/bootstrap.css';
import { Button,
         Nav,
         Navbar,
         NavBrand,
         NavItem,
         MenuItem,
         NavDropdown } from 'react-bootstrap';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link, NavLink, Route } from 'react-router-dom';

import img from '../images/bkg.png';

class AsyncApp extends Component {

  render () {

   return (
     <h3>
       Hello world! This is a boilerplate application made by Alpha Nexus Technologies LLC.
       <img src={img}></img>
     </h3>
   );
  }
}

export default AsyncApp;
