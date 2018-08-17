import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

class Profile extends Component {
  state = {

  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    axios.get(`/users/userId/${this.props.match.params.userId}`)
      .then(res => {
        this.setState({
          user: res.data[0],
        });
      })
      .catch(e => {
        console.log('[client] error fetching seller: ', e);
      });
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
    if (this.state.user !== undefined) {
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={3}>
              <Thumbnail src="/" alt="242x200">
                <h3>{this.state.user.username}</h3>
                <p>{this.state.user.bio}</p>
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
    } else {
      return null;
    }
  }
}

export default withRouter(Profile);