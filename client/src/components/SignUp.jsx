import React from 'react';
import { Button, Col, Checkbox, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: ''
    }
    this.textInput = React.createRef();
    this.updateFirstName = this.updateFirstName.bind(this);
  }
  updateFirstName (e) {
    console.log('ref',e.target.value);
    this.setState=({firstname: e.target.value});
    console.log('state', this.state.firstname);
  }
  
  render () {

    

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('submit');
      // gather the input of each field
      // combine them together
      // send them to server
      
    }
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
                <FormControl type="text" placeholder="Enter Last Name..." />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                email
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Enter Email..." />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalUserName">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Enter Username..." />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Enter Password..." />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button 
                  type="submit"
                  onClick={e => handleSubmit(e)}
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