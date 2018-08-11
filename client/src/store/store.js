import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer.js';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk
  ),
  window.devToolsExtension && window.devToolsExtension()
);

export default store;
