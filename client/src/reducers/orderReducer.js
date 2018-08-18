const defaultState = {
  fetchingOrders: false,
  orders: {
    active: [],
    completed: []
  },
  orderFetchSuccess: null
};

const ordersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_ORDERS_START':
      return Object.assign({}, state, {fetchingOrders: true});
    case 'FETCH_ORDERS_SUCCESS':
      return Object.assign({}, state, {orders: action.payload.orders, ordersFetchSuccess: true, fetchingOrders: false});
    case 'FETCH_ORDERS_FAIL': 
      return Object.assign({}, state, {fetchingOrders: false, ordersFetchSuccess: false});
    case 'CLOSE_MODAL':
      return Object.assign({}, state, {ordersFetchSuccess: null});
    default: 
      return state;
  }
};

export default ordersReducer;