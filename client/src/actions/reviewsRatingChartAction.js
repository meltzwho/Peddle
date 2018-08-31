import axios from 'axios';

export const getFeedback = (userId) => {
  return dispatch => {
    return axios.get(`/ratings/feedback/${userId}`)
      .then(res => dispatch(getFeedbackSuccess(res.data)),
        () => console.log('[redux]: error getting feedback', e));
  };
};

export const getFeedbackSuccess = (feedback) => {
  let ratingCount = {};
  feedback.forEach(comment => {
    ratingCount[comment.rating] = ratingCount[comment.rating] + 1 || 1;
    ratingCount.total = ratingCount.total + 1 || 1;
  });
  let values = [];
  if (!ratingCount['']) {
    if (ratingCount.hasOwnProperty('5')) {
      values.push({label: '5 Stars', value: (ratingCount['5']/ratingCount.total*100), fill: '#4BD762'})
    }
    if (!ratingCount.hasOwnProperty('5')) {
      values.push({label: '5 Stars', value: 0, fill: '#4BD762'})
    }
    if (ratingCount.hasOwnProperty('4')) {
      values.push({label: '4 Stars', value: (ratingCount['4']/ratingCount.total*100), fill: '#6EDB8F'})
    }
    if (!ratingCount.hasOwnProperty('4')) {
      values.push({label: '4 Stars', value: 0, fill: '#6EDB8F'})
    }
    if (ratingCount.hasOwnProperty('3')) {
      values.push({label: '3 Stars', value: (ratingCount['3']/ratingCount.total*100), fill: '#278ECF'})
    }
    if (!ratingCount.hasOwnProperty('3')) {
      values.push({label: '3 Stars', value: 0, fill: '#278ECF'})
    }
    if (ratingCount.hasOwnProperty('2')) {
      values.push({label: '2 Stars', value: (ratingCount['2']/ratingCount.total*100), fill: '#FFC266'})
    }
    if (!ratingCount.hasOwnProperty('2')) {
      values.push({label: '2 Stars', value: 0, fill: '#FFC266'})
    }
    if (ratingCount.hasOwnProperty('1')) {
      values.push({label: '1 Stars', value: (ratingCount['1']/ratingCount.total*100), fill: '#FF7B65'})
    }
    if (!ratingCount.hasOwnProperty('1')) {
      values.push({label: '1 Stars', value: 0, fill: '#FF7B65'})
    }
  }
  return {
    type: 'GET_FEEDBACKS',
    payload: {
      feedback: values
    }
  };
};

export const wipeFeedbacks = () => ({type: 'WIPE_FEEDBACKS'});
