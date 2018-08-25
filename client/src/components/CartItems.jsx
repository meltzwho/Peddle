import React from 'react';
import { Col, Row, Image, Button, Panel } from 'react-bootstrap';
import '../../dist/styles/Cart.css';


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
        <Col xs={10} sm={3}>
          <Image 
            className="cart_image" 
            style={{width: '100%', objectFit: 'fit'}} 
            src={item.image_url} 
            alt="Product sideview"
            rounded
          />
        </Col>

        <Col xs={12} sm={3}>
          <h4>{item.title}</h4>
          <div>
            Sold by: 
            <a href={`/profile/${1}`}>
              {item.sellerUsername}
            </a>
          </div>
    
          <div>Qty Available: {item.quantity.length}</div>
          <div>Condition: {item.condition}</div>
        </Col>

        <Col xs={12} sm={3}>
          <h4 className="">
            {'$ ' + item.price}
          </h4>
        </Col>

        <Col xs={6} sm={3}>
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

        <Col xs={8} sm={3}>
          <div>Description: {item.description}</div>
        </Col>
        <Col xs={6} sm={3}>
          <Button
            className="remove-button"
            onClick={e => props.removeItemFromCart(e, index)}
            bsStyle="danger" 
            bsSize="medium" 
          >
            Remove
          </Button>
        </Col>
      </Row>
    );
  });


  return (
    <Panel className="checkout_wrapper">
      <Panel.Heading className="panel-heading">
        <Row className="show-grid">
          <Col xs={12} sm={12} md={5}>
            <h2 
              className="shopCart"
            >
              {props.currentuser.first_name + "'s Shopping Cart"}
            </h2>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <h2 className="shopCartPrice">{'Total: $ ' + cartAmount}</h2>
          </Col>
          <Col xs={12} sm={6} md={3}>
            { 
              props.emptycart 
                ? (
                  <Button 
                    className="checkout-button"
                    onClick={e => props.handlecheckout(e)}
                    bsStyle="warning" 
                    bsSize="large" 
                    disabled
                  >
                    Checkout
                  </Button>
                ) 
                : (
                  <Button 
                    className="checkout-button"
                    onClick={e => props.handlecheckout(e)}
                    bsStyle="warning" 
                    bsSize="large" 
                  >
                    Checkout
                  </Button>
                )
            }
          </Col>
        </Row>
      </Panel.Heading>
      <Panel.Body className="panel-body">
        {
          props.emptycart
            ? (
              <Row className="show-grid" style={{textAlign: "center"}}>
                <Col xs={10}><h2>Your Cart is Empty :(</h2></Col>
                <Col xs={12}>
                  <Image 
                    className="empty_cart_image" 
                    style={{width: '100%', objectFit: 'contain'}} 
                    src="/assets/empty-cart.jpg"
                    rounded
                  />
                </Col>
              </Row>
            ) : collection
        }
      </Panel.Body>
    </Panel>
  );
};
  
export default CartItems;