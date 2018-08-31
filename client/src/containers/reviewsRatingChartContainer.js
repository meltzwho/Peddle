import { connect } from 'react-redux';
import { getFeedback, wipeFeedbacks } from '../actions/reviewsRatingChartAction';
import ReviewsRatingChart from '../components/ReviewsRatingChart';

const mapStateToProps = (state) => {
  return {
    feedbacks: state.reviewsRatingChart.feedbacks,
    sellerId: state.listingEntry.listing.id_seller,
    buyerId: state.user.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeedback: (sellerId) => {
      dispatch(getFeedback(sellerId));
    },
    wipeFeedback: () => {
      dispatch(wipeFeedbacks());
    }
  };
};

const reviewsRatingChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewsRatingChart);

export default reviewsRatingChartContainer;