import React from 'react';
import { Button, Col, Checkbox, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

export default class SignUp extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  };
  
  updateFirstName = (e) => {
    this.setState({firstname: e.target.value});
  }
  updateLastName = (e) => {
    this.setState({lastname: e.target.value});
  }
  updateEmail = (e) => {
    this.setState({email: e.target.value});
  }
  updateUserName = (e) => {
    this.setState({username: e.target.value});
  }
  updatePassword = (e) => {
    this.setState({password: e.target.value});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    
    let formContents = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    console.log('submit', formContents);
    axios({
      method: 'post',
      url: '/signup/create',
      data: { formContents }
    })
    .then(response => {
      console.log('in signup client response:');
      // send to last page (send to '/', then check to see last page)
    })
    .catch(err => {
      // send back to '/signup'
    });
    
  }
  
  render () {
    return (
      <div>
        <div className="login_wrapper">
        
          <Form horizontal>
            <FormGroup controlId="formHorizontalFirstName">
              <Col componentClass={ControlLabel} sm={2}>
                First Name
              </Col>
              <Col sm={10}>
                <FormControl 
                  type="text" 
                  placeholder="Enter FirstName..." 
                  value={this.state.firstname}
                  onChange={this.updateFirstName}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalLastName">
              <Col componentClass={ControlLabel} sm={2}>
                Last Name
              </Col>
              <Col sm={10}>
                <FormControl 
                  type="text" 
                  placeholder="Enter Last Name..." 
                  value={this.state.lastname}
                  onChange={this.updateLastName}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                email
              </Col>
              <Col sm={10}>
                <FormControl 
                  type="email" 
                  placeholder="Enter Email..."
                  value={this.state.email}
                  onChange={this.updateEmail} 
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalUserName">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl 
                  type="text" 
                  placeholder="Enter Username..." 
                  value={this.state.username}
                  onChange={this.updateUserName}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl 
                  type="password" 
                  placeholder="Enter Password..." 
                  value={this.state.password}
                  onChange={this.updatePassword}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button 
                  type="submit"
                  onClick={this.handleSubmit}
                >Create Your Account</Button>
              </Col>
            </FormGroup>

            <div className="aTag_wrapper">
              <a href="/login" className="justSignIn">
                Already have an account? Sign in.
              </a>
            </div>

            <div className="oauth_wrapper">
              <p>or sign in with...</p>
              <a href="/auth/google"><Button >Sign in with Google</Button></a>
              <Button>Sign in with Facebook</Button>
            </div>
          
          </Form>;
        </div>
      </div>
    );
  }
}