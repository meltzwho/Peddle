import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Grid} from 'react-bootstrap';
import CartItems from './CartItems';
import Checkout from '../Checkout';
import './Cart.css';

export default class Cart extends React.Component { 
  
  state = {
    cartItems: [],
    optionState: 1,
    checkoutMode: false
  }

  // retrieve the contents of the shopping cart on the db
  lookupCart = () => {
    let userID = this.props.currentUser.id_user;
    let consolidateData = [];

    let promises = [];
    axios.get(
      '/cart/lookup',
      { params: { ID: userID } })
      .then(res => {
        
        //this.setState({cartItems: res.data});

        // now aggregate the information about the cart item
        res.data.forEach( item => {
          promises.push(
            axios.get(
              '/cart/aggregate', 
              { params: { ID: item.id_listing } } 
            )
              .then(res => { return res.data; })
          );
        });

        
        // consolidate the data aggregation
        axios.all(promises)
          .then( results => {
            results.forEach( result => {
              
              let data = result[0];
              
              data.quantityCustomerWants = 1;
              data.quantity = Array.apply(null, Array(result[0].quantity)).map( (x, idx) => idx + 1);
              
              data.sellerUsername = result[0].username;
              
              consolidateData.push(data);
            });
           
            this.setState({cartItems: consolidateData});
            return consolidateData;
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    
  }


  removeItemFromCart = (event, index) => {
    event.preventDefault();

    // take item out of database and state
    axios({
      url: './cart/removeItem', 
      method: 'DELETE', 
      data: { ID: this.state.cartItems[index].id_listing }
    })
      .then( () => {
        this.setState({
          cartItems: this.state.cartItems.filter( (item, idx) => {
            return idx !== index;
          })
        });
        ///console.log('after remove from cartItems:', this.state.cartItems);
      })
      .catch(err => console.error('Error', err));
  }

  handleQuantitySelect = (event, index) => {
    event.preventDefault();
    // update quantity in db and state
    console.log('SELECT:', index, event.target.value);
    let item = this.state.cartItems[index];
    console.log('Value:', item);
    axios({
      url: '/cart/update_quantity', 
      method: 'PUT',
      data: { 
        quantity: event.target.value,
        ID: item.id_listing
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    let stateCopy = [...this.state.cartItems];
    stateCopy[index].quantityCustomerWants = (event.target.value * 1);
    this.setState({cartItems: stateCopy});
    this.setState({optionState: event.target.value});
  }

  handleCheckout = (e) => {
    e.preventDefault();
    this.setState({ checkoutMode: true });
  }

  render() {
    let lgClose = () => this.setState({ checkoutMode: false });
    
    if (this.state.cartItems.length === 0) {
      this.lookupCart();
    }
    
    return (
      <div>
        <Grid className="cart" style={{width: '90%'}}>
          <CartItems 
            currentUser={this.props.currentUser}
            removeItemFromCart={this.removeItemFromCart}
            cartItems={this.state.cartItems}
            handleQuantitySelect={this.handleQuantitySelect}
            optionState={this.state.optionState}
            handleCheckout={this.handleCheckout}
          />
          <Checkout 
            handleCheckout={this.handleCheckout}
            show={this.state.checkoutMode}
            onHide={lgClose}
            currentUser={this.props.currentUser}
            cartItems={this.state.cartItems}
          />
        </Grid>
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

