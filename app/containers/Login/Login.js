import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions/userActions';

import { Alert, Col, Row, Grid, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import GeneralErrorComponent from '../../components/errors/GeneralErrorComponent'

class Login extends Component {
  constructor(props) {
    super(props)
    // Be certain that login status is reset
    this.props.dispatch(userActions.logout());
    this.state = {
      user: {
        username: '',
        password: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.password) {
      dispatch(userActions.login(user));
    }
  }

  render() {
    const { loggingIn, loggedIn, error } = this.props;
    const { user, submitted } = this.state;
    return (
      <div>
        <Row>
          <Col md={6} mdOffset={3}>
            {error &&
              <GeneralErrorComponent error={this.props.error} />
            }
            <h3>Log In</h3>
            <form className="login-form" onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={this.handleChange}
                  placeholder="Please enter your username"
                />
              {submitted && !user.username &&
                  <HelpBlock>Username is required</HelpBlock>
                }
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={this.handleChange}
                  placeholder="Please enter your password"
                />
                {submitted && !user.password &&
                  <HelpBlock>Password is required</HelpBlock>
                }
              </FormGroup>

              <FormGroup>
                {!loggingIn &&
                  <div>
                    <Link to="/signup" className="pull-left btn btn-link">New here? Sign Up!</Link>
                    <button className="pull-right btn btn-primary">
                      Log In
                    </button>
                  </div>
                }
                {loggingIn &&
                  <button className="pull-right btn btn-primary" disabled>
                    Loading...
                  </button>
                }
              </FormGroup>

            </form>
          </Col>
        </Row>

      </div>
    );
  }
}


function mapStateToProps(state) {
  const { loggingIn, loggedIn, error } = state.authentication;
  return {
      loggingIn,
      loggedIn,
      error
  };
}

export default connect(mapStateToProps)(Login);
