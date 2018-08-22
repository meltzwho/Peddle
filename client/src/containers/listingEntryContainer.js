import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getListing, getSeller, getRatingById, getFeedbackBySellerId, getImagesByListingId } from '../actions/listingEntryAction';
import ListingEntry from '../components/ListingEntry';

const mapStateToProps = (state) => {
  return {
    listing: state.listingEntry,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListing: (listingId) => {
      axios.get(`/l/lid/${listingId}`)
        .then(response => {
          let sellerId = response.data[0].id_seller;
          dispatch(getListing(response.data[0]));
          axios.get(`/users/userId/${sellerId}`)
            .then(response => { 
              dispatch(getSeller(response.data[0]));
            });
          axios.get(`/ratings/userId/${sellerId}`)
            .then(response => { 
              dispatch(getRatingById(response.data[0]));
            });
          axios.get(`/ratings/feedback/${sellerId}`)
            .then(response => { 
              dispatch(getFeedbackBySellerId(response.data));
            });
          axios.get(`/images/lid/${listingId}`)
            .then(response => { 
              dispatch(getImagesByListingId(response.data));
            });
        })
        .catch(e => {
          dispatch(getListing(e));
        });
    }
};

const listingEntryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingEntry);

export default withRouter(listingEntryContainer);