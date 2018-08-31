import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import SolidGauge from 'react-solidgauge';

class ReviewsRatingChart extends Component {
  componentDidMount() {
    this.props.getFeedback(this.props.sellerId);
  }
  render() {
    if (this.props.feedbacks !== null) {
      return (
        <Row>
          <Col xs={12} sm={6}>
            <div 
              style={{
                width: '100%',
                height: '250px',
              }}
            >
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
                values={this.props.feedbacks}
                animationTime={2000}
                showTooltip
                // animateTime={2000}
                // ease='easeLinear'
                fontSize={12}
              />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(ReviewsRatingChart);