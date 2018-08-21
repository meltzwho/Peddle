import React from 'react';
import ProgressBarItem from './ProgressBar';
import { Link } from 'react-router-dom';
import { Button, Grid, Col, Row } from 'react-bootstrap'

const OrdersItem = (props) => {
  let listings = props.order.listings.map(listing => (
    <Row key={listing.id_listing} xs={18} md={9}>
      <Col xs={18} md={3}>
        <img src={listing.image_url || 'https://s3.amazonaws.com/peddle-images/dat-boi.jpg'} style={{width: '85%', "marginLeft": "5%", height: '85%', objectFit: "scale-down"}}/>
      </Col>
      <Col md={6} mdOffset={1}>
        <Row style={{margin: "20px"}}>
          <h5>{listing.title} <br/> 
            <small>{listing.price}</small>
          </h5>
        </Row>
        <Row style={{margin: "20px"}}>
          <Link className='seller-view-listing' to={`/listingEntry/${listing.id_listing}`}>
            <Button>View Item</Button>
          </Link>
        </Row>   
      </Col>
    </Row>
  ));
  return (
    <Grid>
      <h4>Order #{props.order.id_order}</h4>
      {listings}
      <br />
      <Row style={{width: '80%'}}>
        <ProgressBarItem key={props.order.id_order} status={props.order} />
      </Row>
    </Grid>
  );
};

export default OrdersItem;