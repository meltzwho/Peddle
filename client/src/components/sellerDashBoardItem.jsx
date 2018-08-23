import React from 'react';
import { Button, Col, Row, Grid, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProgressBarItem from './ProgressBar';

const SellerDashboardItem = (props) => {
  let editButton = null;
  let progress = null;
  let viewButton = (
    <Link className='seller-view-listing' to={`/listingEntry/${props.listing.id_listing}`}>
      <Button>View</Button>
    </Link>
  )
  if (props.active) {
    //here we'll make the edit and the view buttons 
    editButton = <Button onClick={(e) => props.edit(e, props.listing)}>Edit</Button>
  }
  if (props.showProgress) {
    progress = <ProgressBarItem key={props.listing.id_listing} status={props.listing.status}  />

  }
  return (
    <Grid>
      <Row>
        <Col xs={18} md={3}>
          <Image src={props.listing.image_url || 'https://s3.amazonaws.com/peddle-images/dat-boi.jpg'} style={{width: '85%', "marginLeft": "5%", height: '85%', objectFit: "scale-down"}} thumbnail />
        </Col>
        <Col md={6} mdOffset={1}>
          <Row style={{margin: "20px"}}>
            <h5>{props.listing.title} <br/> 
              <small>{props.listing.price}</small>
            </h5>
          </Row>
          <Row style={{margin: "20px"}}>
            {viewButton}{' '}{editButton}
          </Row>
          <Row style={{margin: "20px"}}>
            {progress}
          </Row>
        </Col>
   
      </Row>
    </Grid>
  );
};

export default SellerDashboardItem;