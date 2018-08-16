import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/components/App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './src/store/store.js';
import {Provider} from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <StripeProvider apiKey="pk_test_woW7vjizEz5SMaxZ5MyDuLjh">
        <App />
      </StripeProvider>
    </Router>
  </Provider>,
  document.getElementById('app'));
