import React from 'react';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl, Grid, Row, Alert} from 'react-bootstrap';
import axios from 'axios';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: ''
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    let formContents = {
      email: this.state.email,
      password: this.state.password
    };
    
    axios({
      method: 'post',
      url: '/login/validate',
      data: { formContents }
    })
      .then(results => {
      
        this.props.handleLogin(results.data);
        
        // clear fields
        this.setState({
          email: '',
          password: ''
        });
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({
            errorMessage: err.response.data,
            email: '',
            password: ''
          });
        } else {
          this.setState({
            email: '',
            password: ''
          });
        }
      });
  }

  render () {
    return (
      <div>
        <div className="login_wrapper">
          <Grid>
            <Form horizontal>

              {
                this.state.errorMessage
                  ? (
                    <Alert bsStyle="warning" style={{textAlign: 'center'}}>
                      <h4>{this.state.errorMessage}</h4>
                    </Alert>
                  ) : ''
              }

              <Row className="show-grid">
                <FormGroup controlId="Email">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={8}>
                    <FormControl 
                      type="email"
                      name="email" 
                      placeholder="Enter Email..." 
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
              </Row>

              <Row className="show-grid">
                <FormGroup controlId="UserName">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={8}>
                    <FormControl 
                      type="password" 
                      name="password"
                      placeholder="Enter Password..." 
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
              </Row>
                      
              <Row className="show-grid">
                <FormGroup>
                  <Col smOffset={2} sm={8}>
                    <Button
                      bsStyle="primary" 
                      bsSize="large" 
                      block
                      type="submit"
                      onClick={this.handleSubmit}
                    >Sign in
                    </Button>
                  </Col>
                </FormGroup>
              </Row>

              <Row className="show-grid">
                <Col smOffset={2} sm={8}>
                  <div className="aTag_wrapper">
                    <a href="/" className="forgotPassword">
                      Forgot your password?
                    </a>
                    <span>{'    '}</span>
                    <a href="/" className="forgotUserName">
                      Forgot your email?
                    </a>
                  </div>
                </Col>
              </Row>

              <Row className="show-grid">
                <Col smOffset={2} sm={12}>
                  <div className="oauth_wrapper">
                    <p>or sign in with...</p>
                  </div>
                </Col>
              </Row>

              <Row className="show-grid">
                <Col smOffset={2} sm={8}>
                  <a href='/auth/google'>
                    <Button 
                      bsSize="large" 
                      block
                    >Sign in with Google
                    </Button>
                  </a>
                </Col>
              </Row>
                 
            </Form>
          </Grid>
        </div>
      </div>
    );
  }
}