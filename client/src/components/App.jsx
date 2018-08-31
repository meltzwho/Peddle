import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Home from './Home';
import Profile from '../containers/profileContainer';
import EditProfile from '../containers/editProfileContainer';
import Orders from '../containers/orderContainer';
import Listings from './Listings';
import ListingEntry from '../containers/listingEntryContainer';
import Cart from './Cart';
import Login from './Login';
import SignUp from './SignUp';
import SellEntry from '../containers/SellEntryContainer';
import Messages from './Messages';
import SellerDashboard from '../containers/sellerDashboardContainer';
import Navbar from '../containers/navbarContainer';
import Stripe from './Stripe';
import ReviewEntryForm from '../containers/reviewEntryFormContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greetFriends: 'Friend',
      cookieValid: true,
  
      currentuser: {
        id_user: null,
        first_name: 'Guest',
        last_name: '',
        username: 'Guest',
        email: '',
        google_id: null,
        facebook_id: null,
        token: null,
        token_timestamp: null,
        profile_image: ''
      }
    };
  }
  
  componentDidMount() {
    const cookies = new Cookies;
    let cookie = cookies.get('token');
    this.setCookieForGoogleLogin();
    if (cookie) {
      this.isValidUser(cookie);
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
          this.props.addUserToStore(res.data.id_user);
          // put data on state
          if (res.data) {
            this.setState(prevState => ({
              currentuser: {
                ...prevState.currentuser,
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
    if (this.state.currentuser.email === '') {
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
                  currentuser: {
                    ...prevState.currentuser,
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
        axios.post(
          '/validate/token'
          , { payload: cookie }
        )
          .then(response => {
            
            if (response.data) {
              this.props.addUserToStore(cookie.id_user);
              this.sniffCookieToOnboardUser(cookie);
              this.setState({ cookieValid: response.data });
            } else {
              this.setState({
                cookieValid: false,
                currentuser: {
                  id_user: '',
                  first_name: 'Guest',
                  last_name: '',
                  username: 'Guest',
                  email: '',
                  google_id: null,
                  facebook_id: null,
                  token: null,
                  token_timestamp: null,
                  profile_image: ''
                }
              });
            }
          })
          .catch(err => console.error(err));
      }
    } else {
      this.props.addUserToStore(cookie.id_user);
      this.setState({
        cookieValid: false,
        currentuser: {
          id_user: '',
          first_name: 'Guest',
          last_name: '',
          username: 'Guest',
          email: '',
          google_id: null,
          facebook_id: null,
          token: null,
          token_timestamp: null,
          profile_image: ''
        }
      });
    }
  };

  handleLogin = (user) => {
    this.props.addUserToStore(user.id_user);
    if (user) {
      this.setState(prevState => ({
        currentuser: {
          ...prevState.currentuser,
          ...user
        },
        greetFriends: user.first_name,
        cookieValid: true
      }));
      // place a cookie for the user
      this.setACookie(user);
    }
    this.props.history.push('/');
  };

  handleLogout = (e) => {
    e.preventDefault();

    //update redux
    this.props.removeUserFromStore();
    
   

    let resetCurrentuser = {
      id_user: null,
      first_name: 'Guest',
      last_name: '',
      username: 'Guest',
      email: '',
      google_id: null,
      facebook_id: null,
      token: null,
      token_timestamp: null,
      profile_image: ''
    };
  
    // zero out state
    this.setState(prevState => ({
      currentuser: {
        ...prevState.currentuser,
        ...resetCurrentuser
      }, 
      greetFriends: 'Friend',
      cookieValid: false
    }), () => {
      // find cookies and remove them
      const cookies = new Cookies;
      cookies.remove('token');
      cookies.remove('g_token');
      cookies.remove('session');
      cookies.remove('session.sig');
      cookies.remove('fr');
      cookies.remove('name');
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar 
          handleLogout={this.handleLogout} 
          currentuser={this.state.currentuser}
          userId={this.props.currentUserId}
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
              <ListingEntry />
            )
            }
          />
          <Route 
            path='/cart'
            component={() => (
              <Cart 
                currentuser={this.state.currentuser}
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
            path="/editProfile" 
            component={
              () => {
                return this.state.cookieValid 
                  ? <EditProfile />
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
          <Route 
            path='/reviewEntryForm/:listingId'
            component={() => (
              <ReviewEntryForm />
            )}
          />
        </Switch>
      </div>

    );
  }
}

export default withRouter(App);
