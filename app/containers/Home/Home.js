import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Jumbotron } from 'react-bootstrap';

import logo from '../../assets/affect-nexus-logo.png';

class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron style={{
            margin: '0%',
            padding: '5%',
            textAlign: 'center'
          }}>
          <img style={{
              "height": "160px",
              "margin": "40px",
              marginBottom: "80px"
            }}
               src={logo} />
          <h2>
            Find emotions in text!
          </h2>
          <h5>
            This tool processes textual information like a short post or parts of a conversation.
          </h5>
        </Jumbotron>
      </div>
    );
  }
}

export default Home
