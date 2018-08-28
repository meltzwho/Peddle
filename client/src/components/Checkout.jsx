import React from 'react';
import { Col, Row, Image, Button, Modal } from 'react-bootstrap';
import '../../dist/styles/Cart.css';
import Stripe from './Stripe';

class Checkout extends React.Component {
  render() {

    let cartAmount = this.props.cartitems.reduce( (accum, curr) => {
      return accum + ((curr.price * 1) * curr.quantityCustomerWants);
    }, 0);

    const collection = this.props.cartitems.map( (item, index) => {
      
      return (
        <Row 
          className="show-grid checkout-item"
          key={Date.now() * Math.random()}
        >
          <Col xs={3}>
            <Image 
              className="cart_image" 
              style={{width: '100%', objectFit: 'contain'}} 
              src={item.image_url} 
              alt="Product sideview"
              rounded
            />
          </Col>

          <Col xs={5}>
            <h4>{item.title}</h4>
            <div>
              Sold by: 
              <a href={`/profile/${1}`}>
                <h3>{item.sellerUsername}</h3>
              </a>
            </div>
            <h5>Condition: {item.condition}</h5>
          </Col>

          <Col xs={3} xsOffset={1}>
            <h4 className="">
              {'$ ' + item.price}
            </h4>
          </Col>
        </Row>
      );
    });


    return (
      <Modal
        {...this.props}
        className="modal-wrapper"
        style={{textAlign: "center"}}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <h2>Thank You For Shopping with</h2>
            </Col>
            <Col xs={12}>
              <img 
                className="text-logo"
                src="/assets/logo-peddle.jpg" 
                alt="text logo"
                style={{
                  height: "90px",
                  width: "250px",
                  objectFit: "contain",
                  marginTop: "15px"
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} className="checkout-total stripe-button-wrapper">
              <h3><Stripe price={cartAmount}/></h3>
            </Col>
            <Col xs={6} className="checkout-total">
              <h3>{'Total: $' + cartAmount}</h3>
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