import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Image, Well, Button, Panel } from 'react-bootstrap';
import './Cart.css';

const CartItems = (props) => {

  // talley up the cart total & callback to <Cart />
  const amount = props.cartItems.reduce( (accum, item) => {
    return accum + (item.quantityCustomerWants * item.price);
  }, 0);

  const collection = props.cartItems.map( (item, index) => {
    return (
      <div 
        className="cart_item_wrapper"
        key={Date.now() * Math.random()}
      >
        <Panel xs={12}>

          <Panel.Heading />
          
          <Panel.Body>
            <Row>
              <Col xs={4} xsOffset={2}>
                <Image className="cart_image" style={{width: '100%', objectFit: 'fit'}} src={item.image_url[0]} />
              </Col>
              <Col xs={6}>
                <h1>{item.title}</h1>
                <p>{'Sold by: ' + item.username}</p>
                <p>{item.description}</p>
              </Col>
            </Row>
          </Panel.Body>

          <Panel.Footer>
            <Row>

              <Col xs={3}>
                <Button
                  bsSize="large"
                  onClick={e => props.removeItemFromCart(e, index)}
                >
                  Remove
                </Button>
              </Col>

              <Col xs={3}>
                <div className="button_mobile_quantity_wrapper">
                  <p>Quantity</p>
                
                  <div className="button_mobile_quantity">
                    <Button 
                      onClick={e => props.decrementQuantity(e, index)}
                      className="btn btn-default btn-number" 
                    >
                      <span className="glyphicon glyphicon-minus" />
                    </Button>
                
                    <span>{item.quantityCustomerWants}</span>
                  
                    <Button 
                      onClick={e => props.incrementQuantity(e, index)}
                      className="btn btn-default btn-number" 
                    >
                      <span className="glyphicon glyphicon-plus" />
                    </Button>
                  </div>
                </div>
              </Col>

              <Col xs={3}>
                <span className="">
                  {'$ ' + item.price}
                </span>
              </Col>

            </Row>
          </Panel.Footer>

        </Panel>
      </div>
    );
  });

  return (
    <div className="mobile_wrapper">
      <h1>{props.currentUser.username + "'s"}</h1>
      <h2>Shopping Cart</h2>
      <h2>{'Cart Total: $ ' + amount}</h2>
      <Button>Checkout</Button>
      {collection}
    </div>
  )
};
  
export default CartItems;