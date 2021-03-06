import React from 'react';
import { Grid, Button, Col, ControlLabel, Form, FormGroup, FormControl, Panel, Row } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

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
      <div className="login_wrapper">
        <Grid>
  
          <Panel style={{textAlign: 'center'}}>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Sign Up</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Grid>
                <Form horizontal>
                  <Row>

                    <FormGroup controlId="formHorizontalFirstName">
                      <Col componentClass={ControlLabel} sm={2}>
                      First Name
                      </Col>
                      <Col sm={8}>
                        <FormControl 
                          id="signup-firstName"
                          type="text"
                          name="firstname"
                          placeholder="Enter First Name..." 
                          value={this.state.firstname}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </FormGroup>
                  </Row>

                  <Row>
                    <FormGroup controlId="formHorizontalLastName">
                      <Col componentClass={ControlLabel} sm={2}>
                        Last Name
                      </Col>
                      <Col sm={8}>
                        <FormControl
                          id="signup-lastName" 
                          type="text" 
                          name="lastname"
                          placeholder="Enter Last Name..." 
                          value={this.state.lastname}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </FormGroup>
                  </Row>

                  <Row>
                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>
                      Email
                      </Col>
                      <Col sm={8}>
                        <FormControl 
                          id="signup-email"
                          type="email"
                          name="email"
                          placeholder="Enter Email..."
                          value={this.state.email}
                          onChange={this.handleChange} 
                        />
                      </Col>
                    </FormGroup>
                  </Row>
                  <Row>

                    <FormGroup controlId="formHorizontalPassword">
                      <Col componentClass={ControlLabel} sm={2}>
                        Password
                      </Col>
                      <Col sm={8}>
                        <FormControl 
                          id="signup-password"
                          type="password"
                          name="password"
                          placeholder="Enter Password..." 
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </FormGroup>
                  </Row>
                  <Row>
                    <FormGroup>
                      <Col smOffset={2} sm={8}>
                        <Button
                          bsSize="large"
                          bsStyle='primary'
                          block
                          id="signup-submit"
                          type="submit"
                          onClick={this.handleSubmit}
                        >Create Your Account
                        </Button>
                      </Col>
                    </FormGroup>
                  </Row>

                  <Row className="show-grid">
                    <Col sm={12}>
                      <div className="aTag_wrapper">
                        Already have an account?
                      </div>
                    </Col>
                  </Row>

                  <Row className="show-grid">
                    <Col sm={12}>
                      <div className="aTag_wrapper">
                        <Link to="/login" className="justSignIn">
                          Login here.
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  <Row className="show-grid">
                    <Col sm={12}>
                      <div className="oauth_wrapper">
                        <p>or login in with...</p>
                      </div>
                    </Col>
                  </Row>

                  <Row className="show-grid">
                    <FormGroup>
                      <Col smOffset={2} sm={8}>
                        <a href='/auth/google'>
                          <Button 
                            bsSize="large" 
                            block
                          >Log in with Google
                          </Button>
                        </a>
                      </Col>
                    </FormGroup>
                  </Row>
                
                </Form>
              </Grid>
            </Panel.Body>
          </Panel>
        </Grid>
      </div>
    );
  }
}