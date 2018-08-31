import axios from 'axios';

export const fetchOrders = (userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    return axios.get('/orders/orders', {params: {userId: userId}})
      .then(response => {         
        return dispatch(fetchOrdersSuccess(response.data)); 
      },
      error => dispatch(fetchOrdersFail()));
  };
};

export const fetchOrdersStart = () => ({type: 'FETCH_ORDERS_START'});

export const fetchOrdersSuccess = (orders) => (
  {
    type: 'FETCH_ORDERS_SUCCESS',
    payload: {
      orders: orders
    }
  }
);

export const fetchOrdersFail = () => ({type: 'FETCH_ORDERS_FAIL'});

export const closeModal = () => ({type: 'CLOSE_MODAL'});

export const wipeOrders = () => ({type: 'WIPE_ORDERS'});

export const completeOrder = (details) => {
  return dispatch => {
    axios.post('/orders/completeOrder', details)
      .then(response => dispatch(fetchOrders(details.userId)),
        error => console.error('there was an error updating this order', error));
  };
};