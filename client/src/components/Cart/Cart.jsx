import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {Grid, Row, Col} from 'react-bootstrap';
import CartCollection from './CartCollection';
import CartCheckout from './CartCheckout';
import CartMobile from './CartMobile';
//import dummyData from './dummydata';
import './Cart.css';

export default class Cart extends React.Component {
  
  state = {
    isDesktop: true
  }

  componentDidMount() {
    this.updateViewWidth();
    window.addEventListener("resize", this.updateViewWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateViewWidth);
  }

  // incrementQuantity = (event, index) => {
  //   let item = this.props.cartItems[index];
  //   if (item.quantityCustomerWants < item.quantity) {
  //     this.setState({
  //       cartItems: this.props.cartItems.map( (item, idx) => {
  //         if (idx === index) {
  //           item.quantityCustomerWants++;
  //         }
  //         return item;
  //       }) 
  //     });
  //   }
  // }

  // decrementQuantity = (event, index) => {
  //   let item = this.props.cartItems[index];
  //   if (item.quantityCustomerWants > 0) {
  //     this.setState({
  //       cartItems: this.props.cartItems.map( (item, idx) => {
  //         if (idx === index) {
  //           item.quantityCustomerWants--;
  //         }
  //         return item;
  //       }) 
  //     });
  //   }
  // }

  updateViewWidth = () => {
    //console.log(window.innerWidth);
    this.setState({ isDesktop: window.innerWidth > 2000 });
  }

  // removeItemFromCart = (event, index) => {
  //   event.preventDefault();
  //   this.setState({
  //     cartItems: this.props.cartItems.filter( (item, idx) => {
  //       return idx !== index;
  //     })
  //   });
  // }

  mouseEnter = (e) => { console.log(e.target); };

  render () {
    
    const isDesktop = this.state.isDesktop;

    return (
      <div>
        {
          isDesktop 
            ? (
              <div className="cart_flex_wrapper">
                <Grid className="collection">
                  <CartCollection
                    incrementQuantity={this.incrementQuantity}
                    decrementQuantity={this.decrementQuantity}
                    removeItemFromCart={this.removeItemFromCart}
                    cartItems={this.props.cartItems}
                    className="cart_collection"
                    // mouseEnter={this.mouseEnter}
                  />
                </Grid>  
                  
                <Grid className="checkout">
                  <CartCheckout 
                    username={this.props.username}
                    cartItems={this.props.cartItems}
                    className="chart_checkout"
                  />
                </Grid>
              </div>
            )
            : (
              <Grid className="cart">
                <CartMobile 
                  incrementQuantity={this.incrementQuantity}
                  decrementQuantity={this.decrementQuantity}
                  username={this.props.username}
                  removeItemFromCart={this.removeItemFromCart}
                  cartItems={this.props.cartItems}
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

