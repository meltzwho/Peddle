import { connect } from 'react-redux';
import axios from 'axios';
import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFail, closeModal } from '../actions/ordersAction';
import Orders from '../components/Orders';

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    currentUserId: state.user.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchUserOrders: (userId) => {
      dispatch(fetchOrdersStart());
      axios.get('/orders/orders', {params: {userId: userId}})
        .then(response => {
          dispatch(fetchOrdersSuccess(response.data)),
          error => {
            console.error('an error occured fetching the listings', error);
            dispatch(fetchOrdersFail());
          }
        });
    },
    closeFailModal: () => {
      dispatch(closeModal());
    }
    

  };
};

const ordersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);

export default ordersContainer;