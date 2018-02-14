import React, { Component } from 'react';
import { connect } from 'react-redux';

import Home from './Home/Home';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Settings from './Settings/Settings';
import Nexus from './Nexus/Nexus';
import NLPComprehensiveDisplay from './NLP/NLPComprehensiveDisplay';
import NLPInsightDisplay from './NLP/NLPInsightDisplay';

import { Link, NavLink, Route } from 'react-router-dom';
import { Button, Nav, Navbar, NavBrand, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

import { userActions } from '../actions/userActions';

import hex_video from '../assets/hex_video-full-medium-bitrate.mp4';
import logo from '../assets/affect-nexus-logo.png';

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    userActions.logout()
  }

  render () {
    let loginButtons, navOptions, bkgd;
    if (window.location.pathname == '/') { // Check to see if on main page
      bkgd = (
        <video poster="" id="bgvid" playsInline autoPlay muted loop>
           <source src={hex_video} type="video/mp4" />
        </video>
      )
    } else {
      bkgd = (
        <div className="bkgd" />
      )
    }
    if (sessionStorage.getItem('token') != null) {
      navOptions = (
        <div>
          <nav className="nav navbar-nav">
            <li className={ window.location.pathname == '/nexus' ? 'active_page-heading' : '' }>
              <NavLink to="/nexus"><i className="fa fa-bullseye" aria-hidden="true"></i> Nexus</NavLink>
            </li>
            <li className={ window.location.pathname == '/process' ? 'active_page-heading' : '' }>
              <NavLink to="/process"><i className="fa fa-long-arrow-right" aria-hidden="true"></i> Process</NavLink>
            </li>
            { sessionStorage.getItem('interfaceComplexity') == "1" && // Only show if advanced complexity selected
              <li className={ window.location.pathname == '/insight' ? 'active_page-heading' : '' }>
                <NavLink to="/insight"><i className="fa fa-bolt" aria-hidden="true"></i> Insight</NavLink>
              </li>
            }
          </nav>
        </div>
      )
      loginButtons = (
        <div>
          <nav className="nav navbar-nav navbar-right">
            <li style={{
                paddingTop: "19.5px",
                paddingBottom: "19.5px",
                paddingRight: "19.5px",
                color: "#CCC",
                textAlign: "right"
              }}>
              Hi, {sessionStorage.getItem('username')}
            </li>
            <li className={ window.location.pathname == '/settings' ? 'active_page-heading' : '' }>
              <NavLink to="/settings"><i className="fa fa-cogs" aria-hidden="true"></i> Settings</NavLink>
            </li>
            <li className={ window.location.pathname == '/login' ? 'active_page-heading' : '' }>
              <NavLink to="/login" onClick={this.handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i> Log Out</NavLink>
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
              <NavLink to="/signup"><i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i> Log In</NavLink>
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
             <NavLink to="/">
               <img style={{"height": "60px"}}
                    src={logo} />
             </NavLink>
           </Navbar.Brand>
         </Navbar.Header>
         {navOptions}
         {loginButtons}
       </Navbar>
       <div className="container" style={{marginTop: '5vh', marginBottom: '5vh', maxWidth: '1600px'}}>
         <Route path="/" exact component={Home}/>
         <Route path="/signup" component={Signup}/>
         <Route path="/login" component={Login}/>
         <Route path="/settings" component={Settings}/>
         <Route path="/nexus" component={Nexus}/>
         <Route path="/process" component={NLPComprehensiveDisplay}/>
         <Route path="/insight" component={NLPInsightDisplay}/>
       </div>
       {bkgd}
     </div>
   );
  }
}

export default AsyncApp;
