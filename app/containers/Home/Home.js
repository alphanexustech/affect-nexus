import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Jumbotron } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron style={{margin: '0%', padding: '10%'}}>
          <h2 style={{textAlign: 'right'}}>Affect Nexus</h2>
          <h4 style={{width: '70%'}}>
            This affect exploration tool allows you to experiment and explore.<br></br>
            It is your nexus to process information and gain useful insight!<br></br>
            Quickly find out what the underlying emotions are in any kind of text!
          </h4>
          <br></br>
          <br></br>
          <h6>
            P.S. Welcome to the Beta-testing of this tool! We're excited you're here!
            Please send feedback to
            <a className="more_info_link" href="mailto:natebuechler@gmail.com?Subject=Hello%20AffectNexus">
              <i className="fa fa-1x fa-envelope"></i>
              me
            </a>
            , and have fun!
          </h6>
        </Jumbotron>
      </div>
    );
  }
}

export default Home
