import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import SolidGauge from 'react-solidgauge';
import ReviewEntry from './ReviewEntry';

class ReviewsList extends Component {
  state = {
    
  }
  componentDidMount() {
    this.getRatings();
  }
  getRatings = () => {
    let ratingCount = {};
    this.props.feedback.forEach(comment => {
      ratingCount[comment.rating] = ratingCount[comment.rating] + 1 || 1;
      ratingCount.total = ratingCount.total + 1 || 1;
    });
    let values = [];
    if (!ratingCount['']) {
      if (ratingCount.hasOwnProperty('5')) {
        values.push({label: '5 Stars', value: (ratingCount['5']/ratingCount.total*100), fill: '#4BD762'})
      }
      if (!ratingCount.hasOwnProperty('5')) {
        values.push({label: '5 Stars', value: 0, fill: '#4BD762'})
      }
      if (ratingCount.hasOwnProperty('4')) {
        values.push({label: '4 Stars', value: (ratingCount['4']/ratingCount.total*100), fill: '#6EDB8F'})
      }
      if (!ratingCount.hasOwnProperty('4')) {
        values.push({label: '4 Stars', value: 0, fill: '#6EDB8F'})
      }
      if (ratingCount.hasOwnProperty('3')) {
        values.push({label: '3 Stars', value: (ratingCount['3']/ratingCount.total*100), fill: '#278ECF'})
      }
      if (!ratingCount.hasOwnProperty('3')) {
        values.push({label: '3 Stars', value: 0, fill: '#278ECF'})
      }
      if (ratingCount.hasOwnProperty('2')) {
        values.push({label: '2 Stars', value: (ratingCount['2']/ratingCount.total*100), fill: '#FFC266'})
      }
      if (!ratingCount.hasOwnProperty('2')) {
        values.push({label: '2 Stars', value: 0, fill: '#FFC266'})
      }
      if (ratingCount.hasOwnProperty('1')) {
        values.push({label: '1 Stars', value: (ratingCount['1']/ratingCount.total*100), fill: '#FF7B65'})
      }
      if (!ratingCount.hasOwnProperty('1')) {
        values.push({label: '1 Stars', value: 0, fill: '#FF7B65'})
      }
    }
    this.setState({
      values: values
    });
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
              {this.state.values? (
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
              ): null
              }
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