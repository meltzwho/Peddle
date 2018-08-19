import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Panel, Row, ButtonGroup, Button } from 'react-bootstrap';
import './Cart.css';

const CartCollection = ({cartItems, mouseEnter}) => {

  const collection = cartItems.map( item => {
    return (
      <Col 
        onMouseEnter={e => mouseEnter(e)}
        key={item.idListing} 
        xs={6} med={4}
      >
        <Image src={item.img_url} />
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
          >
              Remove
          </Button>

          <div className="button_collection_quantity_wrapper">
            <p>Quantity</p>
          
            <div className="button_collection_quantity">
              <Button 
                // onClick={}
                className="btn btn-default btn-number" 
                disabled="disabled" 
                data-type="minus" 
                data-field="quant[1]"
              >
                <span className="glyphicon glyphicon-minus" />
              </Button>
            
              <span>{item.quantityCustomerWants}</span>
            
              <Button className="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
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
    <Row className="collection_row">
      {collection}
    </Row>
    
  );
};

export default CartCollection;