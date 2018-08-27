import { connect } from 'react-redux';
import { fetchUserListings, closeModal } from '../actions/sellerDashboardActions';
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
    }
    

  };
};

const sellerDashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerDashboard);

export default sellerDashboardContainer;