import React, { Component } from 'react';
import { connect } from 'react-redux';

import Home from './Home/Home';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Overview from './Overview/Overview';
import NLPComprehensiveDisplay from './NLP/NLPComprehensiveDisplay';
import NLPRadiantDisplay from './NLP/NLPRadiantDisplay';

import { Link, NavLink, Route } from 'react-router-dom';
import { Button, Nav, Navbar, NavBrand, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

import { userActions } from '../actions/userActions';

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    console.log('here');
    userActions.logout('a')
  }

  render () {
    let loginButtons, navOptions;
    if (localStorage.getItem('token') != null) {
      navOptions = (
        <div>
          <nav className="nav navbar-nav">
            <li>
              <NavLink to="/overview"><i className="fa fa-globe" aria-hidden="true"></i> Overview</NavLink>
            </li>
            <li>
              <NavLink to="/nlp"><i className="fa fa-fire" aria-hidden="true"></i> Fast Processing</NavLink>
            </li>
            <li>
              <NavLink to="/nlp"><i className="fa fa-tint" aria-hidden="true"></i> Precise Processing</NavLink>
            </li>
            <li>
              <NavLink to="/nlp-radiant"><i className="fa fa-bolt" aria-hidden="true"></i> Radiant</NavLink>
            </li>
          </nav>
        </div>
      )
      loginButtons = (
        <div>
          <nav className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/login" onClick={this.handleLogout}>Log Out</NavLink>
            </li>
          </nav>
        </div>
      )
    } else {
      navOptions = <nav></nav>
      loginButtons = (
        <div>
          <nav className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
          </nav>
        </div>
      )
    }

   /**
    * These are the routes that get defined are in <Root>.
    * This is a component that is used as the routh path.
    */
   return (
     <div>
       <Navbar className="navbar-inverse">
         <Navbar.Header>
           <Navbar.Brand>
             <NavLink to="/">Affect Nexus</NavLink>
           </Navbar.Brand>
         </Navbar.Header>
         {navOptions}
         {loginButtons}
       </Navbar>
       <div className="container" style={{marginTop: '5vh', marginBottom: '5vh', maxWidth: '1600px'}}>
         <Route path="/" exact component={Home}/>
         <Route path="/signup" component={Signup}/>
         <Route path="/login" component={Login}/>
         <Route path="/overview" component={Overview}/>
         <Route path="/nlp" component={NLPComprehensiveDisplay}/>
         <Route path="/nlp-radiant" component={NLPRadiantDisplay}/>
       </div>
     </div>
   );
  }
}

export default AsyncApp;
