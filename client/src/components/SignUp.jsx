import React from 'react';
import { Grid, Button, Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default class SignUp extends React.Component {
  
  state = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // make username the first part of the email (up to the '@')
    let splitEmail = this.state.email.split('@');

    let formContents = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      username: splitEmail[0],
      password: this.state.password
    };
   
    axios({
      method: 'post',
      url: '/signup/create',
      data: { formContents }
    })
      .then(response => {
        
        //now set a default rating for this user
        axios({
          method: 'post',
          url: '/signup/rating',
          data: { ID: response.data.id_user }
        })
          .then( (res) => console.log('after db rating:', res.data))
          .catch(err => {console.error(err)});

        this.props.handleLogin(response.data);

        // clear all input fields
        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          username: '',
          password: ''
        });
      })
      .catch(err => {
        console.error(err);
        // clear all input fields
        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          username: '',
          password: ''
        });
      });
    
  }
  
  render () {
    return (
      <div>
        <div className="login_wrapper">
          <Grid>
            <Form horizontal>
              <FormGroup controlId="formHorizontalFirstName">
                <Col componentClass={ControlLabel} sm={2}>
                First Name
                </Col>
                <Col sm={10} className="signup-firstName">
                  <FormControl 
                    className="signup-firstName"
                    classID="signup-firstName"
                    type="text"
                    name="firstname"
                    placeholder="Enter FirstName..." 
                    value={this.state.firstname}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalLastName">
                <Col componentClass={ControlLabel} sm={2}>
                  Last Name
                </Col>
                <Col sm={10}>
                  <FormControl
                    classID="signup-lastName" 
                    type="text" 
                    name="lastname"
                    placeholder="Enter Last Name..." 
                    value={this.state.lastname}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                email
                </Col>
                <Col sm={10}>
                  <FormControl 
                    classID="signup-email"
                    type="email"
                    name="email"
                    placeholder="Enter Email..."
                    value={this.state.email}
                    onChange={this.handleChange} 
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl 
                    classID="signup-password"
                    type="password"
                    name="password"
                    placeholder="Enter Password..." 
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button 
                    classID="signup-submit"
                    type="submit"
                    onClick={this.handleSubmit}
                  >Create Your Account
                  </Button>
                </Col>
              </FormGroup>

              <div className="aTag_wrapper">
                <a href="/login" className="justSignIn">
                Already have an account? Login here.
                </a>
              </div>

              <div className="oauth_wrapper">
                <p>or login in with...</p>
                <a href="/auth/google">
                  <Button>Login in with Google</Button>
                </a>
              </div>
          
            </Form>;
          </Grid>
        </div>
      </div>
    );
  }
}