import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getListing, getBuyer } from '../actions/reviewEntryFormAction';
import ReviewEntryForm from '../components/ReviewEntryForm';

const mapStateToProps = (state) => {
  return {
    listing: state.reviewEntryForm.listing,
    seller: state.reviewEntryForm.seller,
    buyer: state.reviewEntryForm.buyer,
    ratings: state.reviewEntryForm.ratings,
    feedbacks: state.feedbacks,
    title: state.reviewEntryForm.title,
    rating: state.reviewEntryForm.rating,
    feedback: state.reviewEntryForm.feedback,
    userId: state.user.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListing: (listingId) => {
      dispatch(getListing(listingId));
    },
    getBuyer: (buyerId) => {
      dispatch(getBuyer(buyerId));
    }
  };
};

const reviewEntryFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewEntryForm);

export default withRouter(reviewEntryFormContainer);