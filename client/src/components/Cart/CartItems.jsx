import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Image, Button, Panel } from 'react-bootstrap';
import './Cart.css';


const CartItems = (props) => {

  let cartAmount = props.cartItems.reduce( (accum, curr) => {
    return accum + ((curr.price * 1) * curr.quantityCustomerWants);
  }, 0);
  
  const collection = props.cartItems.map( (item, index) => {
    return (
      <Row 
        className="show-grid"
        key={Date.now() * Math.random()}
      >
        <Col xs={3}>
          <Image 
            className="cart_image" 
            style={{width: '100%', objectFit: 'fit'}} 
            src={item.image_url} 
            alt="Product sideview"
            rounded
          />
        </Col>

        <Col xs={3}>
          <h2>{item.title}</h2>
          <div>
            Sold by: 
            <a href={`/profile/${1}`}>
              {item.seller_username}
            </a>
          </div>
    
          <div>Qty Available: {item.quantity}</div>
          <div>Description: {item.description}</div>
          <div>Condition: {item.condition}</div>
          <Button
            bsSize="large"
            onClick={e => props.removeItemFromCart(e, index)}
          >
            Remove
          </Button>

        </Col>

        <Col xs={3}>
          <span className="">
            {'$ ' + item.price}
          </span>
        </Col>

        <Col xs={3}>
          <select 
            value={props.optionState} 
            onChange={e => props.handleQuantitySelect(e, index)}
          >
            {
              item.quantity.map( each => {
                return (
                  <option 
                    key={Date.now() * Math.random()} 
                    value={each}
                  >
                    {each}
                  </option>
                );
              })
            }
          </select>
        </Col>

      </Row>
    );
  });

  return (
    <Panel xs={12}>
      <Panel.Heading>
        <Row className="show-grid">
          <Col xs={3}>
            <h2>Shopping Cart</h2>
          </Col>
          <Col xs={3}>
            <h2>{'Total: $ ' + cartAmount}</h2>
          </Col>
          <Col xs={6}>
            <Button 
              onClick={e => props.handleCheckout(e)}
              bsStyle="warning" 
              bsSize="large" 
              block
            >
              Checkout
            </Button>
          </Col>
        </Row>
      </Panel.Heading>
      <Panel.Body>
        {collection}
      </Panel.Body>
      <Panel.Footer>
        <Row className="show-grid">
          <Col xs={3}>
            <h2>Shopping Cart</h2>
          </Col>
          <Col xs={3}>
            <h2>{'Total: $ ' + cartAmount}</h2>
          </Col>
          <Col xs={6}>
            <Button 
              onClick={e => props.handleCheckout(e)}
              bsStyle="warning" 
              bsSize="large" 
              block
            >
              Checkout
            </Button>
          </Col>
        </Row>
      </Panel.Footer>
    </Panel>
  )
};
  
export default CartItems;