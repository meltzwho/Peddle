import { connect } from 'react-redux';
import axios from 'axios';
import { fetchProgressStart, fetchProgressComplete } from '../actions/progressBarActions';
import ProgressBarComponent from '../components/ProgressBar';

const mapStateToProps = (state) => {
  return {
    progress: state.progress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchProgress: (listingId) => {
      dispatch(fetchProgressStart());
      axios.get('/progressBar/status', {params: {listingId: listingId}})
        .then(response => {
          console.log('the response data in the client', response.data);
          dispatch(fetchProgressComplete(response.data)),
          error => {
            console.error('an error occured fetching the details for the progress bar', error);
          }
        });
    }
  };
};

const ProgressBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressBarComponent);

export default ProgressBarContainer;