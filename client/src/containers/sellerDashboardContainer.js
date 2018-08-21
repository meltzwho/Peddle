import { connect } from 'react-redux';
import axios from 'axios';
import { fetchListingsStart, fetchListingsSuccess, fetchListingsFail, closeModal } from '../actions/sellerDashboardActions';
import { editExistingListing } from'../actions/sellEntryAction';
import SellerDashboard from '../components/SellerDashboard';

const mapStateToProps = (state) => {
  return {
    listings: state.sellerListings
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchUserListings: (userId) => {
      dispatch(fetchListingsStart());
      axios.get('/sellerDashboard/listings', {params: {userId: userId}})
        .then(response => {
          dispatch(fetchListingsSuccess(response.data)),
          error => {
            console.error('an error occured fetching the listings', error);
            dispatch(fetchListingsFail());
          };
        });
    },
    closeFailModal: () => {
      dispatch(closeModal());
    },
    editListing: (listing) => {
      dispatch(editExistingListing(listing));
    }
    

  };
};

const sellerDashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerDashboard);

export default sellerDashboardContainer;