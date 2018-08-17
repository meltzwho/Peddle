import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProgressBarItem from './ProgressBar';

const SellerDashboardItem = (props) => {
  let editButton = null;
  let viewButton = (
    <Link className='seller-view-listing' to={`/listingEntry/${props.listing.id_listing}`}>
      <Button>View</Button>
    </Link>
  )
  if (props.active) {
    //here we'll make the edit and the view buttons 
    editButton = <Button onClick={(e) => props.edit(e, props.listing)}>Edit</Button>
  }
  return (
    <div>
      <h5>{props.listing.title} <br/> 
        <small>{props.listing.price}</small>
      </h5>
      <img src={props.listing.image_url || 'https://s3.amazonaws.com/peddle-images/dat-boi.jpg'} style={{width: '15%', "marginLeft": "5%", height: '50vh', objectFit: "scale-down"}}/>
      <div></div>
      <ProgressBarItem key={props.listing.id_listing} status={props.listing.status}  />
      <div></div>
      {viewButton}{' '}{editButton}
      <p>--------------------------------------------------------------</p>
    </div>
  );
};

export default SellerDashboardItem;