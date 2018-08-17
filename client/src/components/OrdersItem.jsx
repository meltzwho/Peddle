import React from 'react';
import ProgressBarItem from './ProgressBar';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'

const OrdersItem = (props) => {
  let listings = props.order.listings.map(listing => (
    <div key={listing.id_listing}>
      <h5>{listing.title} <br/> 
        <small>{listing.price}</small>
      </h5>
      <img src={listing.image_url || 'https://s3.amazonaws.com/peddle-images/dat-boi.jpg'} style={{width: '15%', "marginLeft": "5%", height: '50vh', objectFit: "scale-down"}}/>
      <Link className='seller-view-listing' to={`/listingEntry/${listing.id_listing}`}>
        <Button>View Item</Button>
      </Link>
    </div>
  ));
  return (
    <div>
      <h4>Order #{props.order.id_order}</h4>
      {listings}
      <ProgressBarItem key={props.order.id_order} status={props.order}  />
      <div></div>
      <p>--------------------------------------------------------------</p>
    </div>
  );
};

export default OrdersItem;