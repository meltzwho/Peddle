import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

class ListingEntry extends Component {
  state = {
    
  }
  componentDidMount() {
    this.getListing();
  }
  getListing() {
    axios.get(`/l/lid/${this.props.match.params.listingId}`)
      .then(res => {
        this.setState({
          listing: res.data[0]
        }, () => {
          this.getSeller();
        });
      })
      .catch(e => {
        console.log('[client] error fetching listing by id: ', e);
      });
  }
  getSeller() {
    axios.get(`/users/userId/${this.state.listing.id_seller}`)
      .then(res => {
        this.setState({
          seller: res.data[0],
        }, () => {
          this.getRatingBySellerId();
        });
      })
      .catch(e => {
        console.log('[client] error fetching seller: ', e);
      });
  }
  getRatingBySellerId() {
    axios.get(`/ratings/userId/${this.state.listing.id_seller}`)
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
    if (this.state.sellerRating !== undefined) {
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={5}>
              <h2>Image</h2>
              <div>Multiple Images</div>
            </Col>
            <Col xs={12} sm={5}>
              <h2>{this.state.listing.title}</h2>
              <div>Sold by: <a href={`/profile/${this.state.seller.id_user}`}>{this.state.seller.username}</a></div>
              <StarRatings 
                rating={+this.state.sellerRating.rating}
                isAggregateRating="true"
                starRatedColor="gold"
                starSelectingHoverColor="yellow"
                starDimension="16px"
                starSpacing="0px"
              />
              {this.state.sellerRating.count === 1 ? 
                <a href="#listingReview">{this.state.sellerRating.count} review</a>
                : <a href="/#listingReview"> {this.state.sellerRating.count} reviews</a>
              }
              <div>Price: <h4>${this.state.listing.price}</h4></div>
              <div>Qty: {this.state.listing.quantity}</div>
              <div>Description: {this.state.listing.description}</div>
              <div>Condition: {this.state.listing.condition}</div>
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
              <h2 id="listingReview">Customer Reviews</h2>
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
    } else {
      return (null)
    }
  }
}

export default withRouter(ListingEntry);