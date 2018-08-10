import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Orders from './Orders.jsx';
import Listings from './Listing.jsx';
import ListingEntry from './ListingEntry.jsx';
import Cart from './Cart.jsx';
import Login from './Login.jsx';
import SellEntry from './SellEntry.jsx';
import Messages from './Messages.jsx';
import SellerDashboard from './SellerDashboard.jsx';

<<<<<<< HEAD
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

export default class App extends Component {
  render() {
    return (
      <h1>
        Welcome to Peddle
        <Login />
        <SignUp />
      </h1>
=======
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
>>>>>>> 7e42b750729c566ff34bb9c615fb9c2ae6628051
    );
  }
}

export default withRouter(App);