import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Grid, Image } from 'react-bootstrap';
import { Button, Well } from 'react-bootstrap';
import './Cart.css';

const CartCheckout = ({cartItems}) => {

  const collection = cartItems.map( (item, index) => {
    return (
      <Row key={item.idListing} className="checkout_row">
        <Col xs={4}>
          <Image src={item.img_url} />
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
          ${item.price}
        </Col>
      </Row>
    );
  });

  return (
    <div>
      {collection}
      
      <Button bsSize="large">
        Checkout $ TOTAL
      </Button>
    </div>
  );
};
  


export default CartCheckout;