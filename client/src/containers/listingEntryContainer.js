import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { fetchCart, getListing, getSeller, getRatingById, getFeedbackBySellerId, getImagesByListingId, wipeListingEntry } from '../actions/listingEntryAction';
import ListingEntry from '../components/ListingEntry';

const mapStateToProps = (state) => {
  return {
    listing: state.listingEntry,
    userId: state.user.userId
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
              let images = response.data.map(image => {
                return {
                  original: image.image_url,
                  thumbnail: image.image_url,
                };
              });
              dispatch(getImagesByListingId(images));
            });
        })
        .catch(e => {
          dispatch(getListing(e));
        });
    },
    fetchCart: (userId) => {
      dispatch(fetchCart(userId));
    },
    wipeListingEntry: () => {
      dispatch(wipeListingEntry());
    }
  };
};

const listingEntryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingEntry);

export default withRouter(listingEntryContainer);