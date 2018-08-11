

import React from 'react';
import { Button, Col, Checkbox, ControlLabel } from 'react-bootstrap';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

export default class Login extends React.Component {
handleLogin = () => {
  axios.get('')
}
  render () {
    return (
      <div>
        <div className="login_wrapper">
          <Form horizontal>
            <FormGroup controlId="UserName">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Enter Username..." />
              </Col>
            </FormGroup>

            <FormGroup controlId="Email">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Enter Email..." />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">Sign in</Button>
              </Col>
            </FormGroup>

            <div className="aTag_wrapper">
              <a href="/" className="forgotPassword">
                Forgot your passowrd?
              </a>
              <a href="/" className="forgotUserName">
                Forgot your username?
              </a>
            </div>

            <div className="oauth_wrapper">
              <p>or sign in with...</p>
              <a href="/auth/google">
                <Button >Sign in with Google</Button>
              </a>
              <a href="/auth/facebook">
                <Button>Sign in with Facebook</Button>
              </a>
            </div>
          </Form>;
        </div>
      </div>
    );
  }
}

