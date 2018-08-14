import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class ListingEntry extends Component {
  state = {
    id_listing: 4,
    id_category: 8,
    id_listing: 0,
    title: "Bose Headphones",
    condition: "used",
    price: "200.00",
    id_seller: 1,
    id_address: 1,
    is_active: 1,
    quantity_sold: null,
    quantity: 1,
    date_posted: "2018-08-14T19:23:25.661Z",
    last_price: null,
    description: "QC35 II Noise Cancelling Headphones ",
    is_shipping: 1,
    is_local: 0
  }
  componentDidMount() {

  }

  render() {
    let listingEntryId = this.props.match.params.listingId;
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} sm={5}>
            <h2>Image</h2>
            <div>Multiple Images</div>
          </Col>
          <Col xs={12} sm={5}>
            <h2>{this.state.title}</h2>
            <div>Seller</div>
            <div>Rating</div>
            <div>Link to reviews</div>
            <div>Price</div>
            <div>Quantity Available: {this.state.quantity}</div>
            <div>Description</div>
            <div>Reviews</div>
          </Col>
          <Col xs={12} sm={2}>
            <h2>Pay</h2>
            <div>Contact Seller</div>
            <div>Add To Cart</div>
            <div>Qty dropdown</div>
            <div>Buy Now</div>
            <div>Watch Item</div>
          </Col>
        </Row>
        <Row>
          <Col sx={12} sm={12}>
            <h2>Social Media</h2>
            <div>Share on Facebook</div>
            <div>Share on Instagram</div>
            <div>Share on Twitter</div>
          </Col>
        </Row>
        <Row>
          <Col sx={12} sm={8}>
            <h2>Customer Reviews</h2>
            <div>rating count</div>
            <div>5 star link</div>
            <div>4 start link</div>
            <div>3 start link</div>
            <div>2 start link</div>
            <div>1 start link</div>
            <div>See all reviews</div>
            <div>Top Reviews</div>
          </Col>
          <Col sx={12} sm={4}>
            <h2>Most Recent Customer Reviews</h2>
          </Col>
        </Row>
        <Row>
          <Col sx={12} sm={12}>
            <h2>Recently viewed items and recommendations</h2>
            <h2>Inspired by your purchases</h2>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(ListingEntry);