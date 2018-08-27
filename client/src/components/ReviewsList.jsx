import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import SolidGauge from 'react-solidgauge';
import ReviewEntry from './ReviewEntry';

class ReviewsList extends Component {
  state = {
    values: [{ label: '5 Stars', value: 90.111111, fill: '#4BD762'},
      { label: '4 Stars', value: 6, fill: '#6EDB8F' },
      { label: '3 Stars', value: 2, fill: '#278ECF' },
      { label: '2 Stars', value: 1, fill: '#FFC266' },
      { label: '1 Star', value: 1, fill: '#FF7B65' }]
  }
  componentDidMount() {

  }
  getRatings = () => {
    
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs={8} sm={8}>
            <h2>Ratings & Reviews</h2>
          </Col>
          <Col xs={4} sm={4}>
            <h2><Link to={`/reviewEntryForm/${this.props.listing.id_listing}`}><Button>Write a Review</Button></Link></h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <div style={{
              width: '100%',
              height: '250px',
            }}>
              <SolidGauge
                responsive
                selectable
                background={{
                  fill: '#ddd',
                  stroke: '#aaa',
                }}
                pathWidth={0.15}
                pathMargin={0.05}
                endAngle={3.14 * 1.5}
                values={this.state.values}
                animationTime={5000}
                showTooltip
                // animateTime={2000}
                // ease='easeLinear'
                fontSize={12}
              />
            </div>
          </Col>
          <Col xs={6} sm={6}>
            <h3></h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <div>
              <h3>Most Recent Customer Reviews</h3>
              {this.props.feedback.map(review => {
                return (
                  <ReviewEntry 
                    key={review.id_feedback}
                    review={review}
                  />
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(ReviewsList);