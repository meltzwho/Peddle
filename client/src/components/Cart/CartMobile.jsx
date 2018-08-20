import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Well, Button } from 'react-bootstrap';
import './Cart.css';

const CartMobile = (props) => {

  // talley up the cart total & callback to <Cart />
  const amount = props.cartItems.reduce( (accum, item) => {
    return accum + (item.quantityCustomerWants * item.price);
  }, 0);

  const collection = props.cartItems.map( (item, index) => {
    return (
      <Col className="mobile_item" key={item.id_listing} xs={12}>
        <Image src={item.image_url[0]} />
        <Well bsSize="small">
          {item.title}
          <br />
          Sold by:
          {item.username}
        </Well> 
        <p>{item.description}</p>
        
        <div className="button_mobile_flex_wrapper">
          <Button
            bsSize="large"
            onClick={e => props.removeItemFromCart(e, index)}
          >
            Remove
          </Button>
          
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

          <Button
            bsSize="large"
          >
            ${item.price}
          </Button>
        </div>

      </Col>
    );
  });

  return (
    <div className="mobile_wrapper">
      <h1>{props.username + "'s"}</h1>
      <h2>Shopping Cart</h2>
      <h2>{'Cart Total: $ ' + amount}</h2>
      <Button>Checkout</Button>
      {collection}
    </div>
  )
};
  
export default CartMobile;