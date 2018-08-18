import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import CartCollection from './CartCollection';
import CartCheckout from './CartCheckout';
import CartMobile from './CartMobile';
import dummyData from './dummydata';

export default class Cart extends React.Component {
  
  state ={
    isDesktop: true,
    cartItems: []
  }

  componentDidMount() {
    this.updateViewWidth();
    window.addEventListener("resize", this.updateViewWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateViewWidth);
  }

  updateViewWidth = () => {
    //console.log(window.innerWidth);
    this.setState({ isDesktop: window.innerWidth > 2000 });
  }

  render () {
    const isDesktop = this.state.isDesktop;

    return (
      <div>
        {
          isDesktop 
            ? (
              <div>
                <CartCollection 
                  cartItems={this.state.cartItems}
                />
                <CartCheckout 
                  cartItems={this.state.cartItems}
                />
              </div>
            )
            : <CartMobile />
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

