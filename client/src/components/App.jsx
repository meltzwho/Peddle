import React, { Component } from 'react';

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
    );
  }
}