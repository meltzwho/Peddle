import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Row, Col, Thumbnail, Button, Image, Modal, Well } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import SellerDashboardItem from './sellerDashBoardItem';

class Profile extends Component {
  state = {

  }
  componentDidMount() {
    //grab the userId from the query string
    let userId = this.props.location.pathname.substr(9);
    if (userId !== 'null') {
      this.props.fetchUserDetails(userId);
      this.props.fetchUserListings(userId);
      this.props.fetchUserRating(userId);
    }
  }
  getRatingBySellerId() {
    axios.get(`/ratings/userId/${this.state.user.id_user}`)
      .then(res => {
        this.setState({
          sellerRating: res.data[0],
        });
      })
      .catch(e => {
        console.log('[client] error fetching seller rating: ', e)
      });
  }
  render() {
    if (!this.props.userProfile.userDetails.id_user) {
      return (
        <h1>You must be logged in to view your profile</h1>
      )
    };
    //logic to display the edit button if the currently logged in user is the same as this profile
    let userId = this.props.location.pathname.substr(9);
    let editButton = this.props.currentUserId === parseInt(userId) ? 
      (
        <Link className='edit-profile' to={'/editProfile'}>
          <Button>Edit</Button> 
        </Link>
      )

      : null;
    
    let activeOrders = null;
    //once our listings are done fetching
    if (this.props.userProfile.fetchProfileListingsSuccess) {
      activeOrders = this.props.userProfile.listings ? 
        this.props.userProfile.listings.map((listing) => (<SellerDashboardItem key={listing.id_listing} listing={listing} active={false} />)) : <Well style={{margin: "20px"}}>Looks like this user doesn't have any active listings</Well>;
    }
    return (
      <Grid>

        <Modal show={this.props.userProfile.fetchUserDetailsSuccess === false} onHide={this.props.closeFailModal}>
          <Modal.Header>
            <Modal.Title>Sorry!</Modal.Title>
          </Modal.Header>
          <Modal.Body>We weren't able to fetch this user's details. Please try again later</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeFailModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Row className="show-grid">
          <Col xs={12} md={3}>
            
            <Image src={this.props.userProfile.userDetails.profile_image_url || 'https://s3.amazonaws.com/peddle-images/No-image-available.jpg'} thumbnail/>
          </Col>
          <Col xs={12} md={8}>
            <h3>{this.props.userProfile.userDetails.username || this.props.userProfile.userDetails.first_name}</h3>
            <p>{this.props.userProfile.userDetails.bio}</p>
            <StarRatings 
              rating={parseFloat(this.props.userProfile.userRating.avg) || 0}
              starRatedColor="gold"
              starDimension="24px"
              starSpacing="0px"
            />
            <span>({this.props.userProfile.userRating.count})</span>
          </Col>
          <Col xs={2} md={1}>
            {editButton}
          </Col>
        </Row>
        <Row>
          <Col xs={16} md={7}>
            <h3>Other Items Sold By Seller</h3>
            {activeOrders}
          </Col>
          <Col sx={16} md={5}>
            <h3>Most Recent Customer Reviews</h3>
          </Col>
        </Row>
      </Grid>
    );

  }
}

export default withRouter(Profile);