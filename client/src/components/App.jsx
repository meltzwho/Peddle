import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
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
import PrivateRoute from './PrivateRoute';


class App extends Component {

  isValidUser = () => {
    axios.get('/')
  };

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
            path='/profile'
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
            path='/listings'
            component={() =>
              <Listings />
            }
          />
          <Route 
            path='/listingEntry'
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
          <PrivateRoute 
            authed={true} 
            path="/admin" 
            component={Admin} 
          />
        </Switch>
      </div>

    );
  }
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route 
//     {...rest} 
//     render={props => (
//       fakeAuth.isAuthenticated ? (
//         <Component {...props}
//         />
//       ) : (
//         <Redirect to={{
//           pathname: '/login',
//           state: { from: props.location }
//         }}
//         />
//       )
//     )}
//   />
// );

const Admin = () => {
  return (
    <div className="jumbotron">
      <h3 className="display-3">Admin Access granted</h3>
    </div>
  );
}

// export const fakeAuth = {
  
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100);
//   },
// };

export default withRouter(App);
