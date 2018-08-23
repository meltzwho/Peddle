import React from 'react';
import { Col, Row, Image, Button, Panel } from 'react-bootstrap';
import './Cart.css';


const CartItems = (props) => {

  let cartAmount = props.cartitems.reduce( (accum, curr) => {
    return accum + ((curr.price * 1) * curr.quantityCustomerWants);
  }, 0);
  
   
  const collection = props.cartitems.map( (item, index) => {
    return (
      <Row 
        className="show-grid item-card"
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
            className="quantity_select"
            value={props.optionState} 
            onChange={e => props.handleQuantitySelect(e, index)}
          >
            {
              item.quantity.map( each => {
                return (
                  <option 
                    className="quantity_select_item"
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
      <Panel.Heading style={{height: "120px"}}>
        <Row className="show-grid">
          <Col xs={4}>
            <h2>Shopping Cart</h2>
          </Col>
          <Col xs={4}>
            <h2>{'Total: $ ' + cartAmount}</h2>
          </Col>
          <Col xs={4}>
            <Button 
              className="checkout-button"
              onClick={e => props.handlecheckout(e)}
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
        {
          props.emptycart
            ? (
              <Row className="show-grid" style={{textAlign: "center"}}>
                <Col xs={10}><h2>Your Cart is Empty</h2></Col>
                <Col xs={6}>
                  <Image 
                    className="empty_cart_image" 
                    style={{width: '100%', objectFit: 'fit'}} 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUnr1Z9AuwBwGl1B_MpAoxvqyzf7s1T3aOocWRxuXJE0CZFfwsxQ"
                    alt="Product sideview"
                    rounded
                  />
                </Col>
              </Row>
            ) : collection
        }
      </Panel.Body>
      <Panel.Footer
        style={{height: "120px"}}
      >
        <Row className="show-grid">
          <Col xs={4}>
            <h2>Shopping Cart</h2>
          </Col>
          <Col xs={4}>
            <h2>{'Total: $ ' + cartAmount}</h2>
          </Col>
          <Col xs={4}>
            <Button 
              onClick={e => props.handlecheckout(e)}
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