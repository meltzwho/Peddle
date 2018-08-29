import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Well, Button, Alert } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

class ReviewEntryForm extends Component {
  state = {
    title: '',
    rating: 0,
    feedback: '',
  }
  componentDidMount() {
    this.props.getListing(this.props.match.params.listingId);
    this.props.getBuyer(this.props.userId);
  }
  updateRating = () => {
    axios.patch('/ratings/updateRating', {
      sellerId: this.props.listing.id_seller,
      rating: this.props.rating
    })
      .catch(e => {
        console.error('[client] error updating rating');
      });
  }
  addFeedback = () => {
    axios.post('/ratings/addFeedback', {
      sellerId: this.props.listing.id_seller,
      buyerId: this.props.userId,
      listingId: this.props.listing.id_listing,
      rating: this.state.rating,
      feedback: this.state.feedback,
      title: this.state.title
    })
      .catch(e => {
        console.error('[client] error adding feedback');
      });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = (e) => {
    Promise.all([this.updateRating(), this.addFeedback()])
      .then(() => {
        alert("Your post has been created");
        this.props.history.push('/orders')
      })
      .catch(e => {
        console.error('[client] error updating ratings: ', e);
      });
  }
  changeRating = (newRating) => {
    this.setState({
      rating: newRating
    });
  }
  render() {
    if (this.props.seller && this.props.buyer) {
      return (
        <Grid>
          <h2 className='text-center'>Share Your Review</h2>
          <Row>
            <Well>
              <Row>
                <Col xs={6} sm={6}>
                  <div style={{fontSize:'12px'}}>SELLER</div>
                  <Link to={`/profile/${this.props.seller.id_seller}`}>
                    <strong style={{fontSize:'18px'}}>{this.props.seller.username}</strong>
                  </Link>
                  {/* <h3>{this.props.list}</h3> */}
                </Col>
                <Col xs={6} sm={6}>
                  <div style={{fontSize:'12px'}}>PRODUCT</div>
                  <Link to={`/listingEntry/${this.props.listing.id_listing}`}>
                    <strong style={{fontSize: '18px'}}>{this.props.listing.title}</strong>
                  </Link>
                </Col>
              </Row>
            </Well>
          </Row>
          <Row>
            <Col smOffset={2}>
              <h3>Rate Seller</h3>
              <StarRatings
                rating={this.state.rating}
                starRatedColor="gold"
                starHoverColor='rgb(135, 206, 250)'
                changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
              />
            </Col>
          </Row>
          <Row>
            <Form horizontal>
              <Row>
                <FormGroup controlId="title">
                  <Col componentClass={ControlLabel} sm={2}>
                      Title
                  </Col>
                  <Col sm={8}>
                    <FormControl 
                      type="text"
                      name="title"
                      value={this.state.title}
                      placeholder="Enter the title for your review..."
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
              </Row>
  
              <Row>
                <FormGroup controlId="feedback">
                  <Col componentClass={ControlLabel} sm={2}>
                      Comments
                  </Col>
                  <Col sm={8}>
                    <FormControl
                      componentClass="textarea"
                      name="feedback"
                      style={{resize: 'vertical', height: '200px'}}
                      value={this.state.feedback}
                      placeholder="Please enter comments here about your experience with this seller."
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
              </Row>
  
              <Row className="show-grid">
                <FormGroup>
                  <Col smOffset={2} sm={8}>
                    <Button
                      bsStyle="primary"
                      bsSize="large"
                      block
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Submit Feedback
                    </Button>
                  </Col>
                </FormGroup>
              </Row>
            </Form>
          </Row>
        </Grid>
      );
    } else {
      return null;
    }
  }
}

export default ReviewEntryForm;