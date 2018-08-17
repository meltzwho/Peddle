import React from 'react';
import { Button, Col, Checkbox, ControlLabel, Form, FormGroup, FormControl, Grid , Row} from 'react-bootstrap';
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
      .then(res => {
        this.props.handleLogin(res.data);
        
        // clear fields
        this.setState({
          email: '',
          username: ''
        });
      })
      .catch(err => {
        this.setState({
          email: '',
          username: ''
        });
        console.error(err);
      });
    
  }

  render () {
    return (
      <div>
        <div className="login_wrapper">
          <Grid>
            <Form horizontal>

              <Row className="show-grid">
                <FormGroup controlId="UserName">
                  <Col componentClass={ControlLabel} sm={2}>
                    Username
                  </Col>
                  <Col sm={8}>
                    <FormControl 
                      type="text" 
                      name="username"
                      placeholder="Enter Username..." 
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
              </Row>

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
                      Forgot your passowrd?
                    </a>
                    <a href="/" className="forgotUserName">
                      Forgot your username?
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
                <Col smOffset={2} sm={4}>
                  <a href='/auth/google'>
                    <Button 
                      bsSize="large" 
                      block
                    >Sign in with Google
                    </Button>
                  </a>
                </Col>
                <Col sm={4}>
                  <a href="/auth/facebook">
                    <Button
                      bsSize="large" 
                      block
                    >Sign in with Facebook
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