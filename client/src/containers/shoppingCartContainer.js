import { connect } from 'react-redux';
// import axios from 'axios';
// import { fetchListingsStart, fetchListingsSuccess, fetchListingsFail, closeModal } from '../actions/sellerDashboardActions';
// import { editExistingListing } from'../actions/sellEntryAction';
// import SellerDashboard from '../components/SellerDashboard';

import updateViewWidth from '../actions/shoppingCartAction';
import Cart from '../components/Cart/Cart';

const mapStateToProps = (state) => {
  return {
    currentItems: state.currentItems
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

export default shoppingCartContainer;