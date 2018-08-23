import React from 'react';
import { Image, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class EditProfile extends React.Component {
  state = {}

  componentDidMount() {
    this.props.fetchProfileDetails(this.props.currentUserId)
    this.state = this.props.profile.profileDetails;
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let profileDetails = this.props.profile.profileDetails;
    console.log(this.state)
    return (
    
      <div>
        <Image src={profileDetails.profile_image_url || 'https://s3.amazonaws.com/peddle-images/dat-boi.jpg'} thumbnail />
      
        <Form>

          <FormGroup controlId="profileDetails">
            <ControlLabel>Username</ControlLabel>
            <FormControl 
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="profileDetails">
            <ControlLabel>First Name</ControlLabel>
            <FormControl 
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="profileDetails">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl 
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleInputChange}
            />
          </FormGroup>

        </Form>

      </div>

    );
  }
}

export default EditProfile;