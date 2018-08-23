import { connect } from 'react-redux';
import axios from 'axios';
import { fetchProfileListingsStart, fetchProfileListingsSuccess, fetchProfileListingsFail, closeModal, fetchUserDetailsStart, fetchUserDetailsSuccess, fetchUserDetailsFail, fetchUserRatingStart, fetchUserRatingSuccess, fetchUserRatingFail } from '../actions/profileAction';
import Profile from '../components/Profile';

const mapStateToProps = (state) => {
  return {
    userProfile: state.profile,
    currentUserId: state.user.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchUserListings: (userId) => {
      dispatch(fetchProfileListingsStart());
      axios.get('/sellerDashboard/listings', {params: {userId: userId}})
        .then(response => {
          dispatch(fetchProfileListingsSuccess(response.data)),
          error => {
            console.error('an error occured fetching the listings', error);
            dispatch(fetchProfileListingsFail());
          };
        });
    },
    closeFailModal: () => {
      dispatch(closeModal());
    },
    fetchUserDetails: (userId) => {
      dispatch(fetchUserDetailsStart());
      axios.get(`/profile/user`, {params: {userId: userId}})
        .then(response => {
          dispatch(fetchUserDetailsSuccess(response.data)),
          error => {
            console.error('an error occured fetching the user data', error);
            dispatch(fetchUserDetailsFail());
          };
        });
    },
    fetchUserRating: (userId) => {
      dispatch(fetchUserRatingStart());
      axios.get('/profile/rating', {params: {userId: userId}})
        .then(response => {
          dispatch(fetchUserRatingSuccess(response.data)),
          error => {
            console.error('there was an error fetching the user ratings', error);
            dispatch(fetchUserRatingFail());
          };
        });
    }
    

  };
};

const profileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default profileContainer;