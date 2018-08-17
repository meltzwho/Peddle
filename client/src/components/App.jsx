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
import Stripe from './Stripe';

class App extends Component {
  state = {
    greetFriends: 'Friend',
    cookieValid: false,

    currentUser: {
      id_user: '',
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      google_id: null,
      facebook_id: null,
      token: null,
      token_timestamp: null,
      profile_image: ''
    }

  };
  
  componentDidMount() {
    const cookies = new Cookies;
    let cookie = cookies.get('token');
    console.log('DIDMOUNT:cookie', cookie);
    this.sniffCookieToOnboardUser(cookie);
    this.isValidUser(cookie);
    this.setCookieForGoogleLogin();
  }
  componentWillReceiveProps(nextProps) {
    // if the user has switched routes then check validation 
    if (nextProps.location !== this.props.location  && !this.state.cookieValid) {
      
      const cookies = new Cookies;
      let cookie = cookies.get('token');
      console.log('payload:', cookie);
      this.isValidUser(cookie);
      this.setCookieForGoogleLogin();
    }
  }

  setCookieForGoogleLogin = () => {
    const cookies = new Cookies;
    let cookie = cookies.get('user');
    
    if (cookie) {
      let split = cookie.split('"');
      let googleID = split[5];

      // remove old cookie here
      cookies.remove('user');

      axios.get('/session/google', { params: {id: googleID} })
        .then(res => {
        
          // generate our own cookie
          cookies.set(
            'token'
            , {
              'token': res.data.token, 
              'token_timestamp': res.data.token_timestamp,
              'id_user': res.data.id_user
            }
            , { path: '/' } 
          );

          // put data on state
          if (res.data) {
            this.setState(prevState => ({
              currentUser: {
                ...prevState.currentUser,
                ...res.data
              }
            }));
            this.setState({
              greetFriends: res.data.first_name,
              cookieValid: true

            });
          }
        })
        .catch(err => console.error(err));
    }
  };

  sniffCookieToOnboardUser = (cookie) => {
    // if email is on state then don't even start this process
    if (this.state.currentUser.email === '') {
      // check the cookie
      if (Object.prototype.toString.call(cookie).slice(8, -1) === 'Object') {
        if (Object.keys(cookie).length > 0) {
          let id = cookie.id_user;

          // call db for data
          axios.get('/onboard/user', { params: {id: id} })
            .then(res => {
              if (res.data) {

                // update state 
                this.setState(prevState => ({
                  currentUser: {
                    ...prevState.currentUser,
                    ...res.data
                  },
                  greetFriends: res.data.first_name,
                  cookieValid: true
                }));
              }
            })
            .catch(err => console.error(err));
        }
      }
    }
  };

  isValidUser = (payload) => {
    if (Object.prototype.toString.call(payload).slice(8, -1) === 'Object') {
      if (Object.keys(payload).length > 0) {
        // check cookie data vs our db data
        axios.post(
          '/validate/token'
          , { payload }
        )
          .then(response => { 
            this.setState({ cookieValid: response.data });
          })
          .catch(err => console.error(err));
      }
    }
  };
  

  handleLogin = (user) => {
    
    if (user) {
      this.setState(prevState => ({
        currentUser: {
          ...prevState.currentUser,
          ...user
        },
        greetFriends: user.first_name,
        cookieValid: true
      }));
      // place a cookie for the user
      const cookies = new Cookies;
      cookies.set(
        'token'
        , {
          'token': user.token, 
          'token_timestamp': user.token_timestamp,
          'id_user': user.id_user
        }
        , { path: '/' } 
      );
    }
  };

  handleLogout = (e) => {
    e.preventDefault();
    
    // find cookies and remove them
    const cookies = new Cookies;
    cookies.remove('token');
    cookies.remove('g_token');
    cookies.remove('session');
    cookies.remove('session.sig');
    cookies.remove('fr');
    cookies.remove('name');

    let resetCurrentUser = {
      id_user: '',
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      google_id: null,
      facebook_id: null,
      token: null,
      token_timestamp: null,
      profile_image: ''
    };
  

    // zero out state
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        ...resetCurrentUser
      }, 
      greetFriends: 'Friend',
      cookieValid: false
    }));
  }

  render() {
    
    return (
      <div>
        <Navbar 
          handleLogout={this.handleLogout} 
          greetFriends={this.state.greetFriends}
        />
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
                handleLogin={this.handleLogin} 
              />
            )}
          />
          <Route 
            path='/signup'
            component={() =>
              <SignUp handleLogin={this.handleLogin} />
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
            path="/profile" ///:userId" 
            component={() => 
              <Profile />
            }
          />
                
          <Route 
            exact 
            path="/orders" 
            component={
              () => {
                return this.state.cookieValid 
                  ? <Orders />
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
                  ? <SellEntry />
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
                  ? <Messages /> 
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
                  ? <SellerDashboard /> 
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
            path='/payment'
            component={() => (
              <Stripe />
            )}
          />
        </Switch>
      </div>

    );
  }
}

export default withRouter(App);
