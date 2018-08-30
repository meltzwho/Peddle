import { connect } from 'react-redux';
import { fetchSoldListings, fetchActiveListings, fetchInactiveListings, addTrackingData, closeModal } from '../actions/sellerDashboardActions';
import { editExistingListing } from'../actions/sellEntryAction';
import SellerDashboard from '../components/SellerDashboard';

const mapStateToProps = (state) => {
  return {
    listings: state.sellerListings,
    currentUserId: state.user.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    closeFailModal: () => {
      dispatch(closeModal());
    },
    editListing: (listing) => {
      dispatch(editExistingListing(listing));
    },
    submitTrackingData: (details) => {
      dispatch(addTrackingData(details));
    },
    fetchActiveListings: (userId) => {
      dispatch(fetchActiveListings(userId));
    },
    fetchSoldListings: (userId) => {
      dispatch(fetchSoldListings(userId));
    },
    fetchInactiveListings: (userId) => {
      dispatch(fetchInactiveListings(userId));
    }
    

  };
};

const sellerDashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerDashboard);

export default sellerDashboardContainer;