import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import config from '../../../config';

class Stripe extends Component {

  onToken = (amount, currency) => (token, addresses) => {
    let charge = {
      amount: amount,
      source: token.id,
      currency: currency,
      transfer_group: this.props.user.id_user + '-' + Date.now()
    };
    axios.post('/stripe', charge).then((response)=> {
      if (response.data.success.paid) {
        axios.post('/orders', {
          id_buyer: this.props.user.id_user,
          transfer_group: charge.transfer_group,
          address: addresses
        })
          .then(() => this.props.history.push('/orders'));
        
      } else this.props.handleDecline();
    });
    addresses; //create order and add address to DB
  }

  render() {
    return (
      <StripeCheckout
        name="Peddle" // the pop-in header title
        description='Pay for your order' // the pop-in header subtitle
        // image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
        ComponentClass="div"
        panelLabel="Purchase" // prepended to the amount in the bottom pay button
        amount={this.props.price * 100} // cents
        currency="USD"
        stripeKey={config.stripe.stripe_public_key}
        locale="en"
        // email="useremail@gmail.com"
        // Note: Enabling either address option will give the user the ability to
        // fill out both. Addresses are sent as a second parameter in the token callback.
        shippingAddress
        billingAddress
        // billingAddress={false}
        // Note: enabling both zipCode checks and billing or shipping address will
        // cause zipCheck to be pulled from billing address (set to shipping if none provided).
        // zipCode={false}
        zipCode
        alipay={false} // accept Alipay (default false)
        bitcoin={false} // accept Bitcoins (default false)
        allowRememberMe // "Remember Me" option (default true)
        token={this.onToken(this.props.price * 100, 'USD')} // submit callback
        opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
        closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
        // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
        // you are using multiple stripe keys
        reconfigureOnUpdate={false}
        // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
        // useful if you're using React-Tap-Event-Plugin
        // triggerEvent="onTouchTap"
      >
        {/* <Button className="btn btn-primary">
          <
        </Button> */}
      </StripeCheckout>
    );
  }
}

export default withRouter(Stripe);

//https://www.robinwieruch.de/react-express-stripe-payment