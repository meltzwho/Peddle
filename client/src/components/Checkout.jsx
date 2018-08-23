import React from 'react';
import { Grid, Col, Row, Image, Button, Panel, Modal } from 'react-bootstrap';

class Checkout extends React.Component {
  render() {

    let cartAmount = this.props.cartitems.reduce( (accum, curr) => {
      return accum + ((curr.price * 1) * curr.quantityCustomerWants);
    }, 0);

    const collection = this.props.cartitems.map( (item, index) => {
      return (
        <Row 
          className="show-grid"
          key={Date.now() * Math.random()}
        >
          <Col xs={2}>
            <Image 
              className="cart_image" 
              style={{width: '100%', objectFit: 'fit'}} 
              src={item.image_url} 
              alt="Product sideview"
              rounded
            />
          </Col>

          <Col xs={4}>
            <h1>{item.title}</h1>
            <div>
              Sold by: 
              <a href={`/profile/${1}`}>
                <h3>{item.seller_username}</h3>
              </a>
            </div>
            <h3>Condition: {item.condition}</h3>
          </Col>

          <Col xs={2} xsOffset={4}>
            <h1 className="">
              {'$ ' + item.price}
            </h1>
          </Col>
        </Row>
      );
    });

    return (
      <Modal
        {...this.props}
        // className="modal-backdrop"
        style={{textAlign: "center"}}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <h2>Thank You For Shopping with</h2>
              <h1>Peddle</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Button 
                bsStyle="warning" 
                bsSize="large" 
                block
              >
                STRIPE
              </Button>
            </Col>
          </Row>
          {collection}

  
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Checkout;