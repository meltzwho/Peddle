import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid, Image } from 'react-bootstrap';
import { Button, Well } from 'react-bootstrap';
import './Cart.css';

const CartCheckout = (props) => {

  // talley up the cart total & callback to <Cart />
  const amount = props.cartItems.reduce( (accum, item) => {
    return accum + (props.quantityCustomerWants * (item.price * 1));
  }, 0);

  const collection = props.cartItems.map( item => {
    return (
      <Row key={item.id_listing} className="checkout_row">
        <Col xs={4}>
          <Image src={item.image_url[0]} />
        </Col>

        <Col xs={4}>
          <Well bsSize="small">
            {item.title}
            <br />
            Sold by:
            {item.username}
          </Well> 
        </Col>

        <Col xs={3}>
          ${item.price * 1}
        </Col>
      </Row>
    );
  });

  return (
    <div>
      <h1>{props.username + "'s"}</h1>
      <h2>Shopping Cart</h2>
      <h2>{'Cart Total: $ ' + amount}</h2>
      <Button>Checkout</Button>
      {collection}
    </div>
  );
};
  


export default CartCheckout;