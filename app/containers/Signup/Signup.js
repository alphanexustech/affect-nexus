import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions/userActions';

import { Alert, Col, Row, Grid, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        username: '',
        confirmPassword: '',
        password: ''
      },
      submitted: false,
      error: null
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
          error: 'Your username must be at least 3 characters.'
        })
      } else if (user.password.length < 4) {
        this.setState({
          error: 'Your password must be at least 4 characters.'
        })
      } else if (user.password != user.confirmPassword) {
        this.setState({
          error: 'Your password fields did not match. Please reconfirm you password.'
        })
      } else {
        dispatch(userActions.signup(user));
        this.setState({
          error: null
        })
      }
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted, error } = this.state;
    return (
      <div>
        {error &&
          <Alert bsStyle="danger">{error}</Alert>
        }
        <Row>
          <Col md={6} mdOffset={3}>
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
                <Link to="/login" className="pull-left btn btn-link">Cancel</Link>
                {registering &&
                  'Loading...'
                }
                <button className="pull-right btn btn-primary">Sign Up</button>
              </FormGroup>

            </form>
          </Col>
        </Row>

      </div>
    );
  }
}


function mapStateToProps(state) {
  const { registering } = state.registration || false;
  return {
      registering
  };
}

export default connect(mapStateToProps)(Signup);
