import React from 'react';
import { Col, Row, Image, Button, Modal, Panel } from 'react-bootstrap';
import '../../dist/styles/Cart.css';
import Stripe from './Stripe';

class Checkout extends React.Component {

  state = {
    decline: false
  };

  handleDecline = () => {
    this.setState({decline: true});
  };

  render() {

    let cartAmount = this.props.cartitems.reduce( (accum, curr) => {
      return accum + ((curr.price * 1) * curr.quantityCustomerWants);
    }, 0);

    const collection = this.props.cartitems.map( (item, index) => {
      
      return (
        <Panel 
          className="checkout_wrapper" 
          style={{textAlign: 'center'}} 
          key={Date.now() * Math.random()}
        >
          <Panel.Heading className="panel-heading">

            <Row className="show-grid">
              <Col sm={6}>
                <h3 className="shopCart">{item.title}</h3>
              </Col>
              <Col smOffset={2} sm={4}>
                <h3 className="shopCart">
                  {'$ ' + item.price}
                </h3>
              </Col>
            </Row>

          </Panel.Heading>
          <Panel.Body>
            <Row className="show-grid">
              <Col xs={12} sm={6}>
                <Image 
                  className="cart_image" 
                  style={{width: '100%', objectFit: 'contain'}} 
                  src={item.image_url} 
                  alt="Product sideview"
                  rounded
                />
              </Col>

              <Col xs={12} sm={6}>
                <h4>{item.title}</h4>
                <div>
                  Sold by: 
                  <a href={`/profile/${1}`}>
                    <h3>{item.sellerUsername}</h3>
                  </a>
                </div>
                <h5>Condition: {item.condition}</h5>
              </Col>

            </Row>
          </Panel.Body>
        </Panel>
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
            <Col sm={6} xs={12}>
              <h2
                style={{
                  marginTop: "50px"
                }}>
                Thank You For Shopping with</h2>
            </Col>
            <Col sm={6} xs={12}>
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
          {this.state.decline 
            ? (
              <Row>
                <Col xs={12}>
                  <h2 style={{color: 'red'}}> CARD DECLINED!</h2>
                </Col>
              </Row>
            )
            : null }
          <Row>
            <Col xs={6} className="checkout-total stripe-button-wrapper">
              <h3><Stripe price={cartAmount} handleDecline={this.handleDecline} user={this.props.currentuser} /></h3>
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