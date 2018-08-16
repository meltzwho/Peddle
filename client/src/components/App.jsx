import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
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
  state = {
    cookieValid: false,
    currentUser: {}
  };
  
  componentWillReceiveProps(nextProps) {
    console.log('switched route');
    // if the user has switched routes then check validation
    if (nextProps.location !== this.props.location && !this.state.cookieValid ) {
      
      const cookies = new Cookies;
      let payload = cookies.get('token');
    
      this.isValidUser(payload);
      //this.handleGoogleAuth();
    }
  }

  isValidUser = (payload) => {
    axios.post(
      '/validate/token'
      , { payload }
    )
      .then(response => { 
        this.setState({ cookieValid: response.data });
      })
      .catch(err => console.error(err));
  };

  retrieveCurrentUser = (user) => {
    if (user) {
      this.setState(prevState => ({
        currentUser: {
          ...prevState.currentUser,
          ...user
        }
      }));
    }
  };

  // setCookieForGoogleLogin = (user) => {
  //   // on sucessful login 
  // };

  handleGoogleAuth = (event, googleID) => {
    event.preventDefault();
    console.log('handleGoogleAuth called');
    // deserialize
    axios.get('/auth/google')
      .then(res => {
        //console.log('handleGoogleAuth', res.data);
      })
      .catch(err => console.log(err));
    // passport.deserializeUser( (user, done) => {
    //   console.log('deserialize ID:', user.id);
    //   done(null, user.id);
    // });
    // lookup that id & timestamp 
    // generate our own token
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
            path='/login'
            component={() => (
              <Login 
                retrieveCurrentUser={this.retrieveCurrentUser} 
                handleGoogleAuth={this.handleGoogleAuth}
              />
            )
            }
          />
          <Route 
            path='/signup'
            component={() =>
              <SignUp retrieveCurrentUser={this.retrieveCurrentUser} />
            }
          />
          <Route 
            path='/listings/:input'
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
            exact 
            path="/profile" 
            component={
              () => {
                return this.state.cookieValid 
                  ? Profile 
                  : (<Redirect 
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location }
                    }} 
                  />
                  ); 
              }
            } 
          />
          <Route 
            exact 
            path="/orders" 
            component={
              () => {
                return this.state.cookieValid 
                  ? Profile 
                  : (<Redirect 
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location }
                    }} 
                  />
                  ); 
              }
            } 
          />
          <Route 
            exact 
            path="/sellEntry" 
            component={
              () => {
                return this.state.cookieValid 
                  ? Profile 
                  : (<Redirect 
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location }
                    }} 
                  />
                  ); 
              }
            } 
          />
          <Route 
            exact 
            path="/messages" 
            component={
              () => {
                return this.state.cookieValid 
                  ? Profile 
                  : (<Redirect 
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location }
                    }} 
                  />
                  ); 
              }
            } 
          />
          <Route 
            exact 
            path="/sellerDashboard" 
            component={
              () => {
                return this.state.cookieValid 
                  ? Profile 
                  : (<Redirect 
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location }
                    }} 
                  />
                  ); 
              }
            } 
          />
        </Switch>
      </div>

    );
  }
}

export default withRouter(App);
