import React from 'react';
import { Button, Col, Checkbox, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

export default class Login extends React.Component {

  state = {
    email: '',
    username: ''
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    let formContents = {
      email: this.state.email,
      username: this.state.username
    };
    
    axios({
      method: 'post',
      url: '/login/validate',
      data: { formContents }
    })
      .then(response => {
        
        // clear fields
        this.setState({
          email: '',
          username: ''
        });
      // send to last page (send to '/', then check to see last page)
      })
      .catch(err => {
        this.setState({
          email: '',
          username: ''
        });
        // send back to '/signup'
        console.error(err);
      });
    
  }

  handleToken = (e) => {
    e.preventDefault();
    let username = this.state.username;
    // call server
    axios({
      method: 'post',
      url: '/token/grant',
      data: { username }
    })
      .then(response => {
        console.log('in token response :', response.data);
      })
      .catch(err => {
        console.error(err);
      });
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
                <FormControl 
                  type="text" 
                  name="username"
                  placeholder="Enter Username..." 
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="Email">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl 
                  type="email"
                  name="email" 
                  placeholder="Enter Email..." 
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button 
                  type="submit"
                  onClick={this.handleSubmit}
                >Sign in
                </Button>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button 
                  type="submit"
                  onClick={this.handleToken}
                >Token
                </Button>
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
              <a href='/auth/google'>
                <Button>Sign in with Google</Button>
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