import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions/userActions';

import { Alert, Col, Row, Grid, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import GeneralErrorComponent from '../../components/errors/GeneralErrorComponent'

class Signup extends Component {
  constructor(props) {
    super(props)
    // Be certain that login status is reset
    this.props.dispatch(userActions.logout());
    this.state = {
      user: {
        email: '',
        username: '',
        confirmPassword: '',
        password: ''
      },
      submitted: false,
      stateError: null
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
    if (user.email && user.username && user.password && user.confirmPassword) {
      if (user.username.length < 3) {
        user.confirmPassword != null;
        this.setState({
          stateError: 'Your username must be at least 3 characters.'
        })
      } else if (user.username.length > 63) {
        this.setState({
          stateError: 'Whoa dude, that username must be shorter than 64 characters.'
        })
      } else if (user.password.length < 4) {
        this.setState({
          stateError: 'Your password must be at least 4 characters.'
        })
      } else if (user.password != user.confirmPassword) {
        this.setState({
          stateError: 'Your password fields did not match. Please reconfirm your password.'
        })
      } else {
        dispatch(userActions.signup(user));
        this.setState({
          stateError: null
        })
      }
    }
  }

  render() {
    const { registering, error } = this.props;
    const { user, submitted, stateError } = this.state;
    return (
      <div>
        <Row>
          <Col md={6} mdOffset={3}>
            {stateError && !error &&
              <GeneralErrorComponent error={stateError} />
            }
            {error && !stateError &&
              <GeneralErrorComponent error={this.props.error} />
            }
            {error && stateError &&
              <GeneralErrorComponent error={stateError} />
            }
            <h3>Sign Up</h3>
            <form className="login-form" onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={this.handleChange}
                  placeholder="Please enter your username"
                />
              {submitted && !user.email &&
                  <HelpBlock>Email is required</HelpBlock>
                }
              </FormGroup>
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
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={this.handleChange}
                  placeholder="Please enter your confirm your password"
                />
                {submitted && !user.confirmPassword &&
                  <HelpBlock>Confirming the password is required</HelpBlock>
                }
              </FormGroup>

              <FormGroup>
                {!registering &&
                  <div>
                    <Link to="/login" className="pull-left btn btn-link">Cancel</Link>
                    <button className="pull-right btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                }
                {registering &&
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
  const { registering, error } = state.signup;
  return {
      registering,
      error
  };
}

export default connect(mapStateToProps)(Signup);
