import React from 'react';
import { Image, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import ImageUpload from '../containers/imageUploadContainer';

class EditProfile extends React.Component {
  state = {
    bio: '',
    dob: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    username: '',
    address: '',
    city: '',
    state: '',
    title: '',
    zip_code: ''
  }

  componentDidMount() {
    this.props.fetchProfileDetails(this.props.currentUserId);
    this.props.fetchProfileAddress(this.props.currentUserId);
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleEditProfileSubmit = (e) => {
    e.preventDefault();
    let addressId = this.props.profile.addressDetails.id_address || 0;
    this.setState({
      profile_image_url: this.props.picUrls,
      userId: this.props.currentUserId,
      addressId: addressId
    }, () => {
      console.log('the state were submitting', this.state)
      this.props.updateProfileDetails(this.state)
      this.setState({
        bio: '',
        dob: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        username: '',
        address: '',
        city: '',
        state: '',
        title: '',
        zip_code: ''
      });
    });
  }

  render() {
    let profileDetails = this.props.profile.profileDetails;
    let addressDetails = this.props.profile.addressDetails;
    let pendingImage = this.props.picUrls.length > 0 ? <div>Your Image has been uploaded! Hit submit to see the change</div> : null;
    return (
    
      <div>
        <Image src={profileDetails.profile_image_url || 'https://s3.amazonaws.com/peddle-images/dat-boi.jpg'} thumbnail />
        {pendingImage}
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


          <FormGroup controlId="addressTitle">
            <ControlLabel>Address Title</ControlLabel>
            <FormControl 
              type="text"
              name="title"
              value={this.state.title}
              placeholder={addressDetails.title || 'Default'}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="streetAddress">
            <ControlLabel>Street Address</ControlLabel>
            <FormControl 
              type="text"
              name="address"
              value={this.state.address}
              placeholder={addressDetails.address || ''}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="city">
            <ControlLabel>City</ControlLabel>
            <FormControl 
              type="text"
              name="city"
              value={this.state.city}
              placeholder={addressDetails.city || ''}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="state">
            <ControlLabel>State</ControlLabel>
            <FormControl 
              type="text"
              name="state"
              value={this.state.state}
              placeholder={addressDetails.state || ''}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="zipCode">
            <ControlLabel>Zip Code</ControlLabel>
            <FormControl 
              type="text"
              name="zip_code"
              value={this.state.zip_code}
              placeholder={addressDetails.zip_code || ''}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <Button onClick={this.handleEditProfileSubmit}>Submit Changes</Button>
        </Form>

      </div>

    );
  }
}

export default EditProfile;