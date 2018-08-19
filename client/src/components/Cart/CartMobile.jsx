import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Well, ButtonGroup, Button } from 'react-bootstrap';
import './Cart.css';

const CartMobile = (props) => {
  console.log(props);
  console.log(current);
  console.log(props.cart.cartItems);

  const collection = props.cartItems.map( (item, index) => {
    return (
      <Col key={index} xs={12}>
        <Image src={item.img_url} />
        <Well bsSize="small">
          {item.title}
          <br />
          Sold by:
          {item.username}
        </Well> 
        <p>{item.description}</p>
        
        <ButtonGroup>
          <Button
            bsSize="large"
          >
            Remove
          </Button>
          <Button
            bsSize="large"
          >
            Quantity <span>1</span>
          </Button>
          <Button
            bsSize="large"
          >
            ${item.price}
          </Button>
        </ButtonGroup>

      </Col>
    );
  });

  return collection;
};
  
export default CartMobile;