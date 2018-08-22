import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Home from './Home';
import Profile from './Profile';
import Orders from '../containers/orderContainer';
import Listings from './Listings';
import ListingEntry from '../containers/listingEntryContainer';
import Cart from './Cart/Cart';
import Login from './Login';
import SignUp from './SignUp';
import SellEntry from '../containers/SellEntryContainer';
import Messages from './Messages';
import SellerDashboard from '../containers/sellerDashboardContainer';
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
    },
    cartItems: []
  };
  
  componentDidMount() {
    const cookies = new Cookies;
    let cookie = cookies.get('token');
    
    this.isValidUser(cookie);
    this.setCookieForGoogleLogin();
  }

  getCookie (destination) {
    const cookies = new Cookies;
    let cookie = cookies.get('token');
    if(cookie) {
      this.setState({
        cookieValid: true,
        currentUser: {...this.state.currentUser, id_user: cookie.id_user}
      }, () => this.props.history.push(destination));
    }
  }
  
  setACookie = (data) => {
    if (data !== undefined) {
      const cookies = new Cookies;
      cookies.set(
        'token'
        , {
          'token': data.token, 
          'token_timestamp': data.token_timestamp,
          'id_user': data.id_user
        }
        , { path: '/' } 
      );
    }
  };

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
          this.setACookie(res.data);
          console.log('setGoogle');
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
              console.log('sniff');
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

  isValidUser = (cookie) => {
    if (Object.prototype.toString.call(cookie).slice(8, -1) === 'Object') {
      if (Object.keys(cookie).length > 0) {
        // check cookie data vs our db data
        console.log('validating');
        
        axios.post(
          '/validate/token'
          , { payload: cookie }
        )
          .then(response => {
            
            if (response.data) {
              this.sniffCookieToOnboardUser(cookie);
            }
            this.setState({ cookieValid: response.data });
          })
          .catch(err => console.error(err));
      }
    }
  };

  handleAddToCart = (e, listingItemId) => {
    e.preventDefault(e);
    console.log('listingITEM_ID:', listingItemId);

    // get item from db
    axios.get('/cart/listingandphoto', { params: {ID: listingItemId}})
      .then(res => {
        console.log('in client: ', res.data);
        
        let consolidateListings = res.data[0];
        consolidateListings.image_url = [];
        if (res.data.length > 1) {
          // push all the image urls into one array on a single listing
          for (let i = 0; i < res.data.length; i += 1) {
            consolidateListings.image_url.push(res.data[i].image_url);
          }
        }

        this.setState(prevState => ({
          cartItems: prevState.cartItems.push(consolidateListings)}));
      })
      .catch(err => console.error(err));
  }

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
      this.setACookie(user);
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
    
    if (!this.state.cookieValid) this.getCookie(this.props.location.pathname);
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
            component={() => (
              <ListingEntry 
                handleAddToCart={this.handleAddToCart}
              />
            )
            }
          />
          <Route 
            path='/cart'
            component={() => (
              <Cart 
                cartItems={this.state.cartItems}
                username={this.state.currentUser.username}
              />
            )
            }
          />
          <Route 
            path="/profile/:userId" 
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

export default App;
