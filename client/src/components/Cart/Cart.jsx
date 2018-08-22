import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from 'react-bootstrap';
import CartItems from './CartItems';
import './Cart.css';

export default class Cart extends React.Component { 
  state = {
    cartItems: []
  }

  // retrieve the contents of the shopping cart on the db
  lookupCart = () => {

    axios.get(
      '/cart/lookup',
      { params: { currentUserID: this.props.currentUser.id_user} })
      .then(res => {
        // after cart table lookup
        // then gather all other data
      })
      .catch(err => console.error(err));
    
    axios.get(
      '/cart/aggregate', 
      { params: 
        {
          ID: listingItemId,
          currentUserID: this.state.currentUser.id_user
        }
      })
      .then(res => {
        
              
              let consolidateListings = res.data[0];
              // add a key value to hold the quantity the customer wants
              consolidateListings.quantityCustomerWants = 1;
              //consolidateListings.image_url = [];
              let urls = [];
              if (res.data.length > 1) {
                // push all the image urls into one array on a single listing
                for (let i = 0; i < res.data.length; i += 1) {
                
                  if (typeof res.data[i].image_url === 'string') {
                    urls.push(res.data[0].image_url);
                  }
                }
                consolidateListings.image_url = urls;
              } else {
                urls.push(res.data[0].image_url);
                consolidateListings.image_url = urls;
              }
              this.setState(prevState => ({
                cartItems: [ ...prevState.cartItems, consolidateListings]
              }));
            })
            .catch(err => console.error(err));

          axios.get(
            '/cart/cartadd', 
            { params: 
              {
                ID: listingItemId,
                currentUserID: this.state.currentUser.id_user
              }
            })
            .then(res => { console.log(res.data)})
            .catch(err => console.error(err));

        }
      })
      .catch(err => console.error(err));
  }

  removeItemFromCart = (event, index) => {
    event.preventDefault();
    // move this function to the removeItemFromCart
    // adjust the db as well
    axios({
      url: './cart/removefromcart', 
      method: 'DELETE', 
      data: {
        ID: this.state.cartItems[index].id_listing,
        quantity: this.state.cartItems[index].quantityCustomerWants
      }
    })
      .then( () => {
        this.setState({
          cartItems: this.state.cartItems.filter( (item, idx) => {
            return idx !== index;
          })
        });
        console.log('after remove from cartItems:', this.state.cartItems);
      })
      .catch(err => console.error('Error', err));
  }

  incrementCart = (event, index) => {
    let item = this.state.cartItems[index];
    if (item.quantityCustomerWants < item.quantity) {
      this.setState({
        cartItems: this.state.cartItems.map( (item, idx) => {
          if (idx === index) {
            item.quantityCustomerWants++;

            // update database
            axios({
              url: '/cart/increment', 
              method: 'PUT',
              data: { ID: item.id_listing }
            })
              .then(res => console.log(res))
              .catch(err => console.log(err));
          }
          return item;
        }) 
      });
    }
  }

  decrementCart = (event, index) => {
    let item = this.state.cartItems[index];
    if (item.quantityCustomerWants > 0) {

      this.setState({
        cartItems: this.state.cartItems.map( (item, idx) => {
          if (idx === index) {
            item.quantityCustomerWants--;
          }
          return item;
        }) 
      });
    }
  }

  render() {
    // call cart_list_item to get cart & set state
    return (
      <div>
        <Grid className="cart" style={{width: '80%'}}>
          <CartItems 
            //currentUser={props.currentUser}
            incrementQuantity={this.state.incrementQuantity}
            decrementQuantity={this.state.decrementQuantity}
            removeItemFromCart={this.state.removeItemFromCart}
            cartItems={this.state.cartItems}
            //username={props.username}
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

