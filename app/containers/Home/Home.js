import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Jumbotron } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron style={{margin: '0%', padding: '10%'}}>
          <h4>
            Experiment and explore emotions with this tool.
            Process information and gain useful insight!
            Quickly discover what the underlying emotions are in text!
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
