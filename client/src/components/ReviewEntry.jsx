import React from 'react';
import { Panel } from 'react-bootstrap';
import moment from 'moment';
import StarRatings from 'react-star-ratings'

const ReviewEntry = props => {
  return (
    <div>
      <Panel>
        <Panel.Heading>
          <StarRatings 
            rating={+props.review.rating}
            isAggregateRating="true"
            starRatedColor="gold"
            starSelectingHoverColor="yellow"
            starDimension="16px"
            starSpacing="0px"
          /> 
          {props.review.title}
          <div>
            {moment(props.review.timestamp).from(Date.now())}
          </div>
        </Panel.Heading>
        <Panel.Body>{props.review.feedback}</Panel.Body>
      </Panel>
    </div>
  );
};

export default ReviewEntry;