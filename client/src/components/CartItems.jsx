import React from 'react';
import { Col, Row, Image, Button, Panel } from 'react-bootstrap';
import '../../dist/styles/Cart.css';


const CartItems = (props) => {

  let cartAmount = props.cartitems.reduce( (accum, curr) => {
    return accum + ((curr.price * 1) * curr.quantityCustomerWants);
  }, 0);

  
  const collection = props.cartitems.map( (item, index) => {
    return (
      <div key={Date.now() * Math.random()}>
        <Panel>

          <Panel.Heading>

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

              <Col xs={12} sm={4}>
                <Image 
                  className="cart_image" 
                  style={{width: '100%', objectFit: 'fit'}} 
                  src={item.image_url} 
                  alt="Product sideview"
                  rounded
                />
              </Col>

              <Col xs={12} sm={4}>
                <div>
                  Sold by: 
                  <a href={`/profile/${1}`}>
                    {item.sellerUsername}
                  </a>
                </div>
          
                <div>Qty Available: {item.quantityAvail}</div>
                <div>Condition: {item.condition}</div>
              </Col>

              <Col xs={12} sm={4}>
                <select 
                  className="quantity_select"
                  // value={props.optionState} 
                  onChange={e => props.handleQuantitySelect(e, index)}
                  value={item.quantityCustomerWants}
                >
                  {
                    item.quantity.map( (each, i) => {
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
            <Row className="show-grid">
              <Col xs={12} style={{marginTop: '10px'}}>
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

          </Panel.Body>
        </Panel>
      </div>
      
    );
  });


  return (
    <Panel className="checkout_wrapper" style={{textAlign: 'center'}}>
      <Panel.Heading className="panel-heading">
        <Row className="show-grid">
          <Col sm={12} md={6}>
            <h3 className="shopCart">
              {props.currentuser.first_name + "'s Shopping Cart"}
            </h3>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} mdOffset={6} md={6}>
            <h3 className="shopCartPrice">{'Total: $ ' + cartAmount}</h3>
          </Col>
        </Row>
      </Panel.Heading>
      <Panel.Body>
        <Row className="show-grid">
          <Col xs={12}>
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
        {
          props.emptycart
            ? (
              <Row className="show-grid" style={{textAlign: "center"}}>
                <Col xs={12}><h3>Your Cart is Empty :(</h3></Col>
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