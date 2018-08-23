import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row, Image, Button, Panel, Modal } from 'react-bootstrap';

class Checkout extends React.Component {
  render() {

    let cartAmount = this.props.cartItems.reduce( (accum, curr) => {
      return accum + ((curr.price * 1) * curr.quantityCustomerWants);
    }, 0);

    const collection = this.props.cartItems.map( (item, index) => {
      return (
        <Row 
          className="show-grid"
          key={Date.now() * Math.random()}
        >
          <Col xs={2}>
            <Image 
              className="cart_image" 
              style={{width: '100%', objectFit: 'fit'}} 
              src={item.image_url} 
              alt="Product sideview"
              rounded
            />
          </Col>

          <Col xs={4}>
            <h1>{item.title}</h1>
            <div>
              Sold by: 
              <a href={`/profile/${1}`}>
                <h3>{item.seller_username}</h3>
              </a>
            </div>
            <h3>Condition: {item.condition}</h3>
          </Col>

          <Col xs={2} xsOffset={4}>
            <h1 className="">
              {'$ ' + item.price}
            </h1>
          </Col>
        </Row>
      );
    });

    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <h2>Thank You For Shopping with</h2>
              <h1>Peddle</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Button 
                bsStyle="warning" 
                bsSize="large" 
                block
              >
                STRIPE
              </Button>
            </Col>
          </Row>
          {collection}

  

        

       

      
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Checkout;


//   return (
//     <Panel xs={12}>
//       <Panel.Heading>
//         <Row className="show-grid">
//           <Col xs={3}>
//             <h2>Shopping Cart</h2>
//           </Col>
//           <Col xs={3}>
//             <h2>{'Total: $ ' + cartAmount}</h2>
//           </Col>
//           <Col xs={6}>
//             <Button bsStyle="warning" bsSize="large" block>Checkout</Button>
//           </Col>
//         </Row>
//       </Panel.Heading>
//       <Panel.Body>
//         {collection}
//       </Panel.Body>
//       <Panel.Footer>
//         <Row className="show-grid">
//           <Col xs={3}>
//             <h2>Shopping Cart</h2>
//           </Col>
//           <Col xs={3}>
//             <h2>{'Total: $ ' + cartAmount}</h2>
//           </Col>
//           <Col xs={6}>
//             <Button bsStyle="warning" bsSize="large" block>Checkout</Button>
//           </Col>
//         </Row>
//       </Panel.Footer>
//     </Panel>
//   )
// };
  


// let cartAmount = props.cartItems.reduce( (accum, curr) => {
//   return accum + ((curr.price * 1) * curr.quantityCustomerWants);
// }, 0);

// const collection = props.cartItems.map( (item, index) => {