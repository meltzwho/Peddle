import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const progressBarItem = (props) => {
  let barFill = 25;
  let status = 'Active';
  if (props.status.is_paid === 1) {
    barFill += 25;
    status = 'Bought';
  }
  if (props.status.is_shipped === 1) {
    barFill += 25;
    status = 'Shipped';
  }
  if (props.status.is_completed === 1) {
    barFill += 25;
    status = 'Completed';
  }

  return (
    <div>
      <ProgressBar bsStyle="success" now={barFill} label={status}/>
    </div>
  );
};

export default progressBarItem;
