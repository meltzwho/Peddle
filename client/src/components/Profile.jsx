import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
    this.props.fetchUserDetails(userId);
    this.props.fetchUserListings(userId);
    this.props.fetchUserRating(userId);
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
    //logic to display the edit button if the currently logged in user is the same as this profile
    let userId = this.props.location.pathname.substr(9);
    let editButton = this.props.currentUserId === parseInt(userId) ? <Button>Edit</Button> : null;
    
    let activeOrders = null;
    //once our listings are done fetching
    if (this.props.userProfile.fetchProfileListingsSuccess) {
      activeOrders = this.props.userProfile.listings.active ? 
        this.props.userProfile.listings.active.map((listing) => (<SellerDashboardItem key={listing.id_listing} listing={listing} active={false} />)) : <Well style={{margin: "20px"}}>Looks like this user doesn't have any active listings</Well>;
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
          <Col xs={12} sm={3}>
            {editButton}
            <Thumbnail>
              <Image src={this.props.userProfile.userDetails.profile_image_url || 'https://s3.amazonaws.com/peddle-images/dat-boi.jpg'} thumbnail/>
              <h3>{this.props.userProfile.userDetails.username || this.props.userProfile.userDetails.first_name}</h3>
              <p>{this.props.userProfile.userDetails.bio}</p>
              <Button>Fb</Button>
              <Button>Ig</Button>
              <Button>Twtr</Button><br/>
              <div>Feedback Ratings</div>
              <div>
                <StarRatings 
                  rating={5}
                  starRatedColor="gold"
                  starDimension="16px"
                  starSpacing="0px"
                />
                <span>5 star count</span>
              </div>
              <div>
                <StarRatings 
                  rating={4}
                  starRatedColor="gold"
                  starDimension="16px"
                  starSpacing="0px"
                />
                <span>4 star count</span>
              </div>
              <div>
                <StarRatings 
                  rating={3}
                  starRatedColor="gold"
                  starDimension="16px"
                  starSpacing="0px"
                />
                <span>3 star count</span>
              </div>
              <div>
                <StarRatings 
                  rating={2}
                  starRatedColor="gold"
                  starDimension="16px"
                  starSpacing="0px"
                />
                <span>2 star count</span>
              </div>
              <div>
                <StarRatings 
                  rating={1}
                  starRatedColor="gold"
                  starDimension="16px"
                  starSpacing="0px"
                />
                <span>1 star count</span>
              </div>
            </Thumbnail>
          </Col>
          <Col xs={12} sm={9}>
            <h2>Other Items Sold By Seller</h2>
            {activeOrders}
          </Col>
        </Row>
        <Row>
          <Col sx={12} sm={8}>
            <h2 id="listingReview">Customer Reviews</h2>
            <div>See all reviews</div>
            <div>Top Reviews</div>
          </Col>
          <Col sx={12} sm={4}>
            <h2>Most Recent Customer Reviews</h2>
          </Col>
        </Row>
      </Grid>
    );

  }
}

export default withRouter(Profile);