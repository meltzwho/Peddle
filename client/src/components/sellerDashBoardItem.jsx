import React from 'react';
import { Button, Col, Row, Grid, Image, Modal, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProgressBarItem from './ProgressBar';

const SellerDashboardItem = (props) => {
  let editButton = null;
  let progress = null;
  let displayTracking = false;
  let trackingModal = null;
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
    if (props.listing.status.is_paid > 0 && props.listing.status.is_shipped < 1) {
      displayTracking = true;
    }
  }
  let trackingButton = displayTracking ? <Button onClick={props.trackingToggle}>Add Tracking Information</Button> : null;

  if (props.showTrackingModal) {
    trackingModal = (
      <Modal show={props.showTrackingModal} onHide={props.trackingToggle}>
        <Modal.Header>
          <Modal.Title>Enter Tracking Info Below:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup controlId="trackingData">
              <ControlLabel>Carrier:</ControlLabel>
              <FormControl 
                type="text"
                value={props.carrier}
                name="carrier"
                placeholder="UPS"
                onChange={(e) => props.handleModalChange(e)}
              />
              <ControlLabel>Tracking No:</ControlLabel>
              <FormControl 
                type="text"
                value={props.trackingNo}
                name="trackingNo"
                placeholder="1Z 999 AA1 01 2345 6784"
                onChange={(e) => props.handleModalChange(e)}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.submitTracking(props.listing)}>Submit</Button>
          <Button onClick={props.trackingToggle}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

  return (
    <Grid>
      {trackingModal}
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
            {viewButton}{' '}{editButton}{' '}{trackingButton}
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