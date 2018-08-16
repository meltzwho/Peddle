import React, { Component } from 'react';
import axios from 'axios';

class Stripe extends Component {
  state = {
    setupBegan: false,
    isLoadingFieldsNeeded: true
  }

  componentWillMount() {
    this.fetchFieldsNeeded();
  }

  fetchFieldsNeeded = () => {
    axios.get('/p/stripe/stripeId')
      .then(res => {
        this.setState({
          payment: res.data,
        });
      })
      .catch(e => {
        this.setState({
          error: e,
          isLoadingFieldsNeeded: false,
        });
      });
  }

  render() {
    const { isLoadingFieldsNeeded, setupBegan, error } = this.state;
    if (isLoadingFieldsNeeded) {
      return (
        <div>Loading...</div>
      );
    }
    if (!setupBegan) {
      return (
        <div>
          <div>
            {this.state.error ? 
              <div>{this.state.error}</div>
              : null
            }
            <button type="submit">
              Begin Setup
            </button>
            <p>By clicking setup you agree to the TOS for Stipe.</p>
          </div>
        </div>
      );
    }
  }
}

export default Stripe;