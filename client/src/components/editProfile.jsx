import React from 'react';
import { Image, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import ImageUpload from './imageUpload';

class EditProfile extends React.Component {
  state = {
    bio: '',
    dob: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    username: ''
  }

  componentDidMount() {
    this.props.fetchProfileDetails(this.props.currentUserId)
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let profileDetails = this.props.profile.profileDetails;
    return (
    
      <div>
        <Image src={profileDetails.profile_image_url || 'https://s3.amazonaws.com/peddle-images/dat-boi.jpg'} thumbnail />
        <ImageUpload />
        <Form>

          <FormGroup controlId="username">
            <ControlLabel>Username</ControlLabel>
            <FormControl 
              type="text"
              name="username"
              value={this.state.username}
              placeholder={profileDetails.username || ''}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="firstName">
            <ControlLabel>First Name</ControlLabel>
            <FormControl 
              type="text"
              name="first_name"
              value={this.state.first_name}
              placeholder={profileDetails.first_name || ''}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="lastName">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl 
              type="text"
              name="last_name"
              value={this.state.last_name}
              placeholder={profileDetails.last_name || ''}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="dob">
            <ControlLabel>Date Of Birth</ControlLabel>
            <FormControl 
              type="text"
              name="dob"
              value={this.state.dob}
              placeholder={profileDetails.dob || ''}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="email">
            <ControlLabel>E-Mail</ControlLabel>
            <FormControl 
              type="text"
              name="email"
              value={this.state.email} 
              placeholder={profileDetails.email || ''}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="phoneNumber">
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl 
              type="text"
              name="phone_number"
              value={this.state.phone_number}
              placeholder={profileDetails.phone_number || ''}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="bio">
            <ControlLabel>Bio</ControlLabel>
            <FormControl 
              type="text"
              name="bio"
              value={this.state.bio}
              placeholder={profileDetails.bio || ''}
              onChange={this.handleInputChange}
            />
          </FormGroup>

        </Form>

      </div>

    );
  }
}

export default EditProfile;