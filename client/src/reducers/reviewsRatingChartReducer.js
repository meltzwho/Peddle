const defaultState = {
  feedbacks: null,
};

const reviewsRatingChartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_FEEDBACKS':
      return Object.assign({}, state, {feedbacks: action.payload.feedback});
    case 'WIPE_FEEDBACKS':
      return defaultState;
    default:
      return state;
  }
};

export default reviewsRatingChartReducer;