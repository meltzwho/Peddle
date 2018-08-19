import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {Grid, Row, Col} from 'react-bootstrap';
import CartCollection from './CartCollection';
import CartCheckout from './CartCheckout';
import CartMobile from './CartMobile';
import dummyData from './dummydata';
import './Cart.css';

export default class Cart extends React.Component {
  
  state ={
    // isDesktop: true,
    // cartItems: dummyData
  }

  componentDidMount() {
    this.updateViewWidth();
    window.addEventListener("resize", this.updateViewWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateViewWidth);
  }

  updateViewWidth = () => {
    console.log(window.innerWidth);
    this.setState({ isDesktop: window.innerWidth > 2000 });
  }

  mouseEnter = (e) => { console.log(e.target); };

  render () {
    console.log('cart', this.state)
    const isDesktop = this.state.isDesktop;

    return (
      <div>
        {
          isDesktop 
            ? (
              <div className="cart_flex_wrapper">
                <Grid className="collection">
                  <CartCollection
                    cartItems={this.state.cartItems}
                    className="cart_collection"
                    mouseEnter={this.mouseEnter}
                  />
                </Grid>  
                  
                <Grid className="checkout">
                  <CartCheckout 
                    cartItems={this.state.cartItems}
                    className="chart_checkout"
                  />
                </Grid>
              </div>
            )
            : (
              <Grid className="cart">
                <CartMobile 
                  cartItems={this.state.cartItems}
                />
              </Grid>  
            )
        }
      </div>
    );
  }
}

// Cart.propTypes = {
//   items: PropTypes.array,
//   total: PropTypes.number,
//   currency: PropTypes.string,
//   removeFromCart: PropTypes.func.isRequired
// }

