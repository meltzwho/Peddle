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