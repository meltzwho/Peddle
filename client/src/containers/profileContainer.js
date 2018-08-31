import { connect } from 'react-redux';
import { fetchProfileListings, closeModal, fetchUserDetails, fetchProfileRating, fetchFeedback } from '../actions/profileAction';
import Profile from '../components/Profile';

const mapStateToProps = (state) => {
  return {
    userProfile: state.profile,
    currentUserId: state.user.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchUserListings: (userId) => {
      dispatch(fetchProfileListings(userId));
    },
    closeFailModal: () => {
      dispatch(closeModal());
    },
    fetchUserDetails: (userId) => {
      dispatch(fetchUserDetails(userId));
    },
    fetchUserRating: (userId) => {
      dispatch(fetchProfileRating(userId));
    },
    fetchFeedback: (userId) => {
      dispatch(fetchFeedback(userId));
    }
  };
};

const profileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default profileContainer;