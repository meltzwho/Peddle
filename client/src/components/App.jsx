import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
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

class App extends Component {
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
        </Switch>
      </div>

    );
  }
}

export default withRouter(App);
