import { connect } from 'react-redux';
import { fetchOrders, closeModal, completeOrder } from '../actions/ordersAction';
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
      dispatch(fetchOrders(userId));
    },
    closeFailModal: () => {
      dispatch(closeModal());
    },
    completeOrder: (params) => {
      dispatch(completeOrder(params));
    }
  };
};

const ordersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);

export default ordersContainer;