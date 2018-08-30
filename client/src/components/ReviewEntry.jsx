import React from 'react';
import { Panel } from 'react-bootstrap';
import moment from 'moment';
import StarRatings from 'react-star-ratings'

class ReviewEntry extends React.Component {
  render() {
    return (
      <div>
        <Panel>
          <Panel.Heading>
            <StarRatings 
              rating={+this.props.review.rating}
              isAggregateRating="true"
              starRatedColor="gold"
              starSelectingHoverColor="yellow"
              starDimension="16px"
              starSpacing="0px"
            /> 
            {this.props.review.title}
            <div>
              {moment(this.props.review.timestamp).from(Date.now())}
            </div>
          </Panel.Heading>
          <Panel.Body>{this.props.review.feedback}</Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default ReviewEntry;