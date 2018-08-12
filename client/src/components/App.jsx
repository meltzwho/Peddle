import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Orders from './Orders.jsx';
import Listings from './Listings.jsx';
import ListingEntry from './ListingEntry.jsx';
import Cart from './Cart.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import SellEntry from './SellEntry.jsx';
import Messages from './Messages.jsx';
import SellerDashboard from './SellerDashboard.jsx';
import Notifications from '../containers/notificationContainer.js';


class App extends Component {
  render() {
    return (
      <div>
        <h1>
          Welcome to Peddle
        </h1>
      
        <Switch className='routes'>
          <Route exact path={'/'}
            component={() =>
              <Home />
            }
          />
          <Route path={'/profile'}
            component={() =>
              <Profile />
            }
          />
          <Route path={'/notifications'}
            component={() =>
              <Notifications />
            }
          />
          <Route path={'/orders'}
            component={() =>
              <Orders />
            }
          />
          <Route path={'/listing'}
            component={() =>
              <Listings />
            }
          />
          <Route path={'/listingEntry'}
            component={() =>
              <ListingEntry />
            }
          />
          <Route path={'/cart'}
            component={() =>
              <Cart />
            }
          />
          <Route path={'/login'}
            component={() =>
              <Login />
            }
          />
          <Route path={'/signup'}
            component={() =>
              <SignUp />
            }
          />
          <Route path={'/sellEntry'}
            component={() =>
              <SellEntry />
            }
          />
          <Route path={'/messages'}
            component={() =>
              <Messages />
            }
          />
          <Route path={'/sellerDashboard'}
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
