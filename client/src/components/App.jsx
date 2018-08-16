import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Elements } from 'react-stripe-elements';
import Home from './Home';
import Profile from './Profile';
import Orders from './Orders';
import Listings from './Listings';
import ListingEntry from './ListingEntry';
import Cart from './Cart';
import Login from './Login';
import SignUp from './SignUp';
import SellEntry from '../containers/SellEntryContainer';
import Messages from './Messages';
import SellerDashboard from './SellerDashboard';
import Navbar from './Navbar';
import Stripe from './Stripe';

class App extends Component {
  state = {
    stripe: null,
  }
  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_test_woW7vjizEz5SMaxZ5MyDuLjh')})
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({stripe: window.Stripe('pk_test_woW7vjizEz5SMaxZ5MyDuLjh')});
      });
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch className='routes'>
          <Route 
            exact 
            path='/'
            component={() =>
              <Home />
            }
          />
          <Route 
            path='/profile/:userId'
            component={() =>
              <Profile />
            }
          />
          <Route 
            path='/orders'
            component={() =>
              <Orders />
            }
          />
          <Route 
            path='/listings/:query'
            component={() =>
              <Listings />
            }
          />
          <Route 
            path='/listingEntry/:listingId'
            component={() =>
              <ListingEntry />
            }
          />
          <Route 
            path='/cart'
            component={() =>
              <Cart />
            }
          />
          <Route 
            path='/login'
            component={() =>
              <Login />
            }
          />
          <Route 
            path='/signup'
            component={() =>
              <SignUp />
            }
          />
          <Route 
            path='/sellEntry'
            component={() =>
              <SellEntry />
            }
          />
          <Route 
            path='/messages'
            component={() =>
              <Messages />
            }
          />
          <Route 
            path='/sellerDashboard'
            component={() =>
              <SellerDashboard />
            }
          />
          <Route 
            path='/payment'
            component={() => (
              <Elements>
                <Stripe />
              </Elements>
            )}
          />
        </Switch>
      </div>

    );
  }
}

export default withRouter(App);
