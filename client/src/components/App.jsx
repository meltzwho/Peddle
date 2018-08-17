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
    let payload = cookies.get('token');
    console.log('DIDMOUNT:cookie', payload);
  
    this.isValidUser(payload);
    this.setCookieForGoogleLogin();
    console.log('STATE:friends', this.state.greetFriends);
    console.log('STATE:user', this.state.currentUser);
    console.log('cookieValid:', this.state.cookieValid);
  }
  componentWillReceiveProps(nextProps) {
    
    // if the user has switched routes then check validation 
    //  **( && !this.state.cookieValid )**
    if (nextProps.location !== this.props.location) {
      
      const cookies = new Cookies;
      let payload = cookies.get('token');
      console.log('payload:', payload);
      this.isValidUser(payload);
      this.setCookieForGoogleLogin();
    }
    console.log('STATE:PropsFrinds', this.state.greetFriends);
    console.log('STATE:PropsUser ', this.state.currentUser);
    console.log('cookieValid:Props ', this.state.cookieValid);
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
          }
        })
        .catch(err => console.error(err));
    }
    
  };

  isValidUser = (payload) => {
    if (payload) {
      // check cookie data vs our db data
      axios.post(
        '/validate/token'
        , { payload }
      )
        .then(response => { 
          console.log('ISVALIDUSER: ', response.data);
          this.setState({ cookieValid: response.data });
        })
        .catch(err => console.error(err));
    }
  };

  retrieveCurrentUser = (user) => {
    if (user) {
      this.setState(prevState => ({
        currentUser: {
          ...prevState.currentUser,
          ...user
        },
        greetFriends: user.first_name
      }));
    }
  };

  handleLogout = (e) => {
    e.preventDefault();
    console.log('logout called');
    // find cookies 'token', 'g_token', 'session', 'session.sig' and 'fr' 
    // and remove them
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
      greetFriends: resetCurrentUser.first_name,
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
                retrieveCurrentUser={this.retrieveCurrentUser} 
              />
            )}
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
        </Switch>
      </div>

    );
  }
}

export default withRouter(App);
