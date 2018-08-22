import React, { Component } from 'react';
import { Grid, Row, Col, ButtonToolbar, Modal, Button, Image, Thumbnail } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { 
  FacebookButton,
  TwitterButton,
  GooglePlusButton,
  PinterestButton,
  EmailButton
} from 'react-social';
import axios from 'axios';
import config from '../../../config';
import Stripe from './Stripe';
import ReviewEntry from './ReviewEntry';
import ImageViewer from './ImageViewer';

class ListingEntry extends Component {
  state = {
    id_buyer: 1,
    listing: {
      id_listing: '',
      condition: '',
      date_posted: '',
      description: '',
      quantity: 1
    },
    seller: {
      bio: '',
      username: '',
    },
    sellerRating: {
      count: 0,
      id_user: 0,
      rating: '0',
    },
    sellerFeedback: [{
      id_feedback: 1,
      id_buyer: 1,
      feedback: '',
      id_listing: 1,
      id_seller: 0,
      rating: '0',
      title: ''
    }],
    qty: 1,
    showCart: false
  }
  componentDidMount() {
    this.props.getListing(this.props.match.params.listingId);
  }
  handleChange = (e) => {
    this.setState({
      qty: e.target.value
    });
  }
  handleAddToCart = () => {
    axios.post(`/cart/add/${this.state.listing.id_listing}/${this.state.id_buyer}/${this.state.qty}`)
      .then()
      .catch(e => {
        console.error(e);
      });
  }
  handleShowCart = () => {
    this.setState({ showCart: !this.state.showCart });
  }
  render() {
    let qty = [];
    if (this.state.listing.quantity !== 0) {
      for (let i = 1; i <= this.state.listing.quantity; i++) {
        qty.push(<option key={i} value={i}>{i}</option>);
      }
    } else {
      qty.push(<option key="0" value="0">0</option>);
    }
    if (this.props.listing.listing.id_seller !== '' && this.props.listing.images !== undefined && this.props.listing.rating !== '') {
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={5}>
              <Thumbnail>
                <ImageViewer images={this.props.listing.images} />
              </Thumbnail>
            </Col>
            <Col xs={12} sm={5}>
              <h2>{this.props.listing.listing.title}</h2>
              <div>Sold by: <a href={`/profile/${this.props.listing.seller.id_user}`}>{this.props.listing.seller.username}</a></div>
              <StarRatings 
                rating={+this.props.listing.rating.rating}
                isAggregateRating="true"
                starRatedColor="gold"
                starSelectingHoverColor="yellow"
                starDimension="16px"
                starSpacing="0px"
              />
              {this.props.listing.rating.count === 0 ? 
                <a href="/reviewEntry">Leave a review</a>
                : this.props.listing.rating.count === 1 ?
                  <a href="#listingReview">{this.props.listing.rating.count} review</a>
                  : <a href="/#listingReview"> {this.props.listing.rating.count} reviews</a>
              }
              <div>Price: <h4>${this.props.listing.listing.price}</h4></div>
              <div>Qty Available: {this.props.listing.listing.quantity}</div>
              <div>Description: {this.props.listing.listing.description}</div>
              <div>Condition: {this.props.listing.listing.condition}</div>
            </Col>
            <Col xs={12} sm={2}>
              <ButtonToolbar>
                <Button
                  onClick={() => { 
                    this.handleShowCart(); 
                    this.handleAddToCart();
                  }}
                >
                  Add To Cart
                </Button>
                <Modal
                  show={this.state.showCart}
                  onHide={this.handleShowCart}
                  dialogClassName="custom-modal"
                >
                  <Modal.Body>
                    <Grid>
                      <Col xs={3}>
                        <h4>Added to Cart</h4>
                        {this.props.listing.images === undefined || this.props.listing.images.length === 0? 
                          <Image src='/assets/No-image-available.jpg' alt='no image available' width="100" height="100" />
                          : <Image src={this.props.listing.images[0].original} width="100" height="100" />
                        } 
                      </Col>
                      <Col xs={9}>
                        <br/><br/><br/>
                        <div>
                          <strong>Cart subtotal: </strong>
                          {this.state.qty * this.state.listing.price}
                        </div>
                      </Col>
                    </Grid>
                  </Modal.Body>
                </Modal>
              </ButtonToolbar>
              <div>Qty: 
              </div>
              <select
                onChange={this.handleChange}
                defaultValue={this.state.qty}
              >
                {qty.map(count => count)}
              </select>
              <Stripe listing={this.state.listing}/>
            </Col>
          </Row>
          <Row>
            <Col sx={12} sm={12}>
              <br/>
              <FacebookButton url={window.location.href} appId={config.facebook.id}>Share on Facebook</FacebookButton>
              <TwitterButton url={window.location.href}>Share on Twitter</TwitterButton>
              <GooglePlusButton url={window.location.href}>Share on Google</GooglePlusButton>
              <PinterestButton url={window.location.href}>Share on Pinterest</PinterestButton>
              <EmailButton url={window.location.href}>Share via Email</EmailButton>
            </Col>
          </Row>
          <Row>
            <Col sx={12} sm={8}>
              <h2 id="listingReview">Customer Reviews</h2>
              <a href='/reviews'>{this.props.listing.rating.count} reviews</a>
              <div>
                {this.state.sellerFeedback.map(review => {
                  return (
                    <ReviewEntry 
                      key={review.id_feedback}
                      review={review}
                    />
                  );
                })}
              </div>
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
      return null;
    }
  }
}

export default ListingEntry;