import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from 'react-bootstrap';
import CartItems from './CartItems';
import './Cart.css';

const Cart = (props) => (
  <div>
    <Grid className="cart" style={{width: '80%'}}>
      <CartItems 
        currentUser={props.currentUser}
        incrementQuantity={props.incrementQuantity}
        decrementQuantity={props.decrementQuantity}
        removeItemFromCart={props.removeItemFromCart}
        cartItems={props.cartItems}
        username={props.username}
      />
    </Grid>
  </div>  
);

export default Cart;

// Cart.propTypes = {
//   items: PropTypes.array,
//   total: PropTypes.number,
//   currency: PropTypes.string,
//   removeFromCart: PropTypes.func.isRequired
// }

