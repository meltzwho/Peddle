import React, { Component } from 'react';
import { Row, Col, Well } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ReviewEntry from './ReviewEntry';

class ReviewsList extends Component {
  render() {
    return (
      <Row>
        <Col xs={12} sm={12}>
          <div>
            <h3>Most Recent Customer Reviews</h3>
            {this.props.feedback.length === 0 ? 
              <Well>This user does not have any reviews</Well>
              : this.props.feedback.map(review => (
                <ReviewEntry 
                  key={review.id_feedback}
                  review={review}
                />
              ))
            }
          </div>
        </Col>
      </Row>
    );
  }
}

export default withRouter(ReviewsList);