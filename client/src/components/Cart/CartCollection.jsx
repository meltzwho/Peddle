import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Panel, Row, ButtonGroup, Button } from 'react-bootstrap';
import './Cart.css';

const CartCollection = (props) => {
  console.log('items:', props.cartItems);
  const collection = props.cartItems.map( (item, index) => {
    return (
      <Col 
        className="collection_item"
        // onMouseEnter={e => mouseEnter(e)}
        key={item.id_listing} 
        xs={6} med={4}
      >
        <Image src={item.image_url[0]} />
        <Panel className="panel_cart">
          <Panel.Heading>
            <Panel.Title componentClass="h3">{item.title}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            {'Sold by:  ' + item.username}
            <br />
            {item.description}
          </Panel.Body>
        </Panel>
        
        <div className="button_collection_cluster">
          <Button
            bsSize="large"
            onClick={e => props.removeItemFromCart(e, index)}
          >
              Remove
          </Button>

          <div className="button_collection_quantity_wrapper">
            <p>Quantity</p>
          
            <div className="button_collection_quantity">
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
    <Row className="collection_wrapper">
      {collection}
    </Row>
    
  );
};

export default CartCollection;