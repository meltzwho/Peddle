import { connect } from 'react-redux';
import { addTrackingData, fetchUserListings, closeModal } from '../actions/sellerDashboardActions';
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

    fetchUserListings: (userId) => {
      dispatch(fetchUserListings(userId));
    },
    closeFailModal: () => {
      dispatch(closeModal());
    },
    editListing: (listing) => {
      dispatch(editExistingListing(listing));
    },
    submitTrackingData: (details) => {
      console.log('listing details', details);
      dispatch(addTrackingData(details));
    }
    

  };
};

const sellerDashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerDashboard);

export default sellerDashboardContainer;