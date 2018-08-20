import { connect } from 'react-redux';
// import axios from 'axios';
// import { fetchListingsStart, fetchListingsSuccess, fetchListingsFail, closeModal } from '../actions/sellerDashboardActions';
// import { editExistingListing } from'../actions/sellEntryAction';
// import SellerDashboard from '../components/SellerDashboard';
import shoppingCartReducer from '../reducers/shoppingCartReducer';
import updateViewWidth from '../actions/shoppingCartAction';
import Cart from '../components/Cart/Cart';

const mapStateToProps = (state) => {
  console.log('container:', state);
  return {
    cartItems: state.cartItems
    //cartItems: shoppingCartReducer(state.cartItems)
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    updateViewWidth: () => {
      dispatch(updateViewWidth());
    }
  };
};

// NOT DONE



const shoppingCartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
console.log(shoppingCartContainer);
export default shoppingCartContainer;