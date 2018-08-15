import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/components/App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './src/store/store.js';
import {Provider} from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'));
