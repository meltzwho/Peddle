import React from 'react';
import axios from 'axios';
import {Grid, Panel} from 'react-bootstrap';
import CartItems from './CartItems';
import Checkout from './Checkout';
import '../../dist/styles/Cart.css';

export default class Cart extends React.Component { 
  
  state = {
    cartitems: [],
    optionState: 1,
    checkoutMode: false,
    emptycart: false
  }

  // retrieve the contents of the shopping cart on the db
  lookupCart = () => {
    let userID = this.props.currentuser.id_user;
    let consolidateData = [];

    let promises = [];
    axios.get(
      '/cart/lookup',
      { params: { ID: userID } })
      .then(res => {

        // if cart the person has an empty cart trip flag
        if (res.data.length === 0) {
          this.setState({ emptycart: true });
          return;
        } else {
          this.setState({ emptycart: false });
        } 
        
        // now aggregate the information about the cart item
        res.data.forEach( item => {          
          promises.push(
            axios.get(
              '/cart/aggregate', 
              {
                params: {
                  ID: item.id_listing,
                  userID: this.props.currentuser.id_user
                }
              }
            )
              .then(res => { return {...res.data, quantityCustomerWants: item.quantity }; })
          );
        });

        
        // consolidate the data aggregation
        axios.all(promises)
          .then( results => {
            results.forEach( result => {
              
              let data = result[0];
              
              data.quantityCustomerWants = Number(result.quantityCustomerWants);
              data.quantityAvail = result[0].quantity;
              data.quantity = Array.apply(null, Array(data.quantityCustomerWants > data.quantity ? data.quantityCustomerWants : data.quantity)).map((x, idx) => idx + 1);
              data.sellerUsername = result[0].username;
              
              consolidateData.push(data);
            });
           
            this.setState({cartitems: consolidateData});            
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
      url: './cart/removeitem', 
      method: 'DELETE', 
      data: {
        ID: this.state.cartitems[index].id_listing,
        userID: this.props.currentuser.id_user
      }
    })
      .then( () => {
        this.setState({
          cartitems: this.state.cartitems.filter( (item, idx) => {
            return idx !== index;
          })
        });
        
      })
      .catch(err => console.error('Error', err));
  }

  handleQuantitySelect = (event, index) => {
    event.preventDefault();
    // update quantity in db and state
    
    let item = this.state.cartitems[index];
    
    axios({
      url: '/cart/update_quantity', 
      method: 'PUT',
      data: { 
        quantity: event.target.value,
        ID: item.id_listing,
        userID: this.props.currentuser.id_user
      }
    })
      .catch(err => console.error(err));

    let stateCopy = [...this.state.cartitems];
    stateCopy[index].quantityCustomerWants = (event.target.value * 1);
    this.setState({cartitems: stateCopy});
    this.setState({optionState: event.target.value});
  }

  handlecheckout = (e) => {
    e.preventDefault();
    this.setState({ checkoutMode: true });
  }

  render() {
    let lgClose = () => this.setState({ checkoutMode: false });
    
    if (this.state.cartitems.length === 0 && !this.state.emptycart) {
      this.lookupCart();
    }
    
    return (
      <Grid className="cart" style={{width: '90%', marginTop: '5px'}}>
        <CartItems 
          currentuser={this.props.currentuser}
          removeItemFromCart={this.removeItemFromCart}
          cartitems={this.state.cartitems}
          handleQuantitySelect={this.handleQuantitySelect}
          optionState={this.state.optionState}
          handlecheckout={this.handlecheckout}
          emptycart={this.state.emptycart}
        />
        <Checkout 
          handlecheckout={this.handlecheckout}
          show={this.state.checkoutMode}
          onHide={lgClose}
          currentuser={this.props.currentuser}
          cartitems={this.state.cartitems}
        />
      </Grid>
    );
      
  }
}
