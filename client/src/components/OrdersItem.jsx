import React from 'react';
import ProgressBarItem from './ProgressBar';
import { Link } from 'react-router-dom';
import { Button, Grid, Col, Row, Image, Well } from 'react-bootstrap';

const OrdersItem = (props) => {
  let trackingInfo = null;
  let orderCompleteButton = null;
  let listings = props.order.listings.map(listing => {
    let status = {
      is_paid: props.order.is_paid,
      is_shipped: listing.is_shipped,
      is_completed: listing.is_completed
    };

    if (status.is_shipped > 0 && status.is_completed < 1) {
      trackingInfo = (
        <Well>
          <strong>Carrier:</strong> {listing.shipping_carrier} <br />
          <strong>Tracking Number:</strong> {listing.tracking_number}
        </Well>
      );
      orderCompleteButton = (
        <Button onClick={() => props.completeOrder(listing)}>Received Item</Button>
      );
    }
  
    return (
      <Row key={listing.id_listing} xs={18} md={9}>
        <Col xs={18} md={3}>
          <Image src={listing.image_url || 'https://s3.amazonaws.com/peddle-images/No-image-available.jpg'} style={{width: '85%', "marginLeft": "5%", height: '85%', objectFit: "scale-down"}} thumbnail/>
        </Col>
        <Col md={6} mdOffset={1}>
          <Row style={{margin: "20px"}}>
            <h5>{listing.title} <br/> 
              <small>{listing.price}</small>
            </h5>
          </Row>
          <Row margin={{margin: "20px"}}>
            {trackingInfo}
          </Row>
          <Row style={{margin: "20px"}}>
            <Col xs={6} sm={6} md={1}>
              <Link className='seller-view-listing' to={`/listingEntry/${listing.id_listing}`}>
                <Button>View Item</Button>
              </Link>
            </Col>
            <Col sx={6} sm={6} smOffset={1} md={1} mdOffset={3}>
              {orderCompleteButton}
            </Col>
          </Row>
          <Row style={{width: '80%'}}>
            <ProgressBarItem key={listing.id_order} status={status} />
          </Row>
        </Col>
      </Row>
    );
  }

  );
  return (
    <Grid>
      <h4>Order #{props.order.id_order}</h4>
      {listings}
    </Grid>
  );
};

export default OrdersItem;