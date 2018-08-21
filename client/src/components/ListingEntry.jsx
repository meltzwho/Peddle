import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
          this.getImagesByListingId();
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
        }, () => {
          this.getFeedbackBySellerId();
        });
      })
      .catch(e => {
        console.log('[client] error fetching seller rating: ', e)
      });
  }
  getFeedbackBySellerId() {
    axios.get(`/ratings/feedback/${this.state.listing.id_seller}`)
      .then(res => {
        this.setState({
          sellerFeedback: res.data,
        });
      })
      .catch(e => {
        console.log('[client] error fetching feedback: ', e);
      });
  }
  getImagesByListingId() {
    axios.get(`/images/lid/${this.state.listing.id_listing}`)
      .then(res => {
        let images = res.data.map(image => {
          return ({
            original: image.image_url,
            thumbnail: image.image_url,
            sizes: '(max-width: 100px) 100px, 100vw'
          });
        });
        this.setState({
          images: images,
        });
      })
      .catch(e => {
        console.log('[client] error fetching feedback: ', e);
      });
  }
  handleChange = (e) => {
    this.setState({
      qty: e.target.value
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
    if (this.state.listing.id_seller !== 0 && this.state.images !== undefined) {
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={5}>
              <Thumbnail>
                <ImageViewer images={this.state.images} />
              </Thumbnail>
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
              {this.state.sellerRating.count === 0 ? 
                <a href="/reviewEntry">Leave a review</a>
                : this.state.sellerRating.count === 1 ?
                  <a href="#listingReview">{this.state.sellerRating.count} review</a>
                  : <a href="/#listingReview"> {this.state.sellerRating.count} reviews</a>
              }
              <div>Price: <h4>${this.state.listing.price}</h4></div>
              <div>Qty Available: {this.state.listing.quantity}</div>
              <div>Description: {this.state.listing.description}</div>
              <div>Condition: {this.state.listing.condition}</div>
            </Col>
            <Col xs={12} sm={2}>
              <ButtonToolbar>
                <Button
                  onClick={(e) => { this.handleShowCart(); this.props.handleAddToCart(e, this.state.listing.id_listing); }}>
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
                        {this.state.images[0] === undefined? 
                          <Image src='/assets/No-image-available.jpg' alt='no image available' width="100" height="100" />
                          : <Image src={this.state.images[0].original} width="100" height="100" />
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
              <a href='/reviews'>{this.state.sellerRating.count} reviews</a>
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

export default withRouter(ListingEntry);