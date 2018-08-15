import { connect } from 'react-redux';
import axios from 'axios';
import {requestCategories, receiveCategories, postListing, listingPostSuccessful, listingPostFailure, newListing, closeModal} from '../actions/sellEntryAction.js';
import SellEntry from '../components/SellEntry.jsx';


const mapStateToProps = (state) => {
  return {
    entry: state.sellEntryReducer,
    urls: state.imageUploadReducer.imageUrls
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchCategories: () => {
      dispatch(requestCategories());
      axios.get('/sellEntry/categories')
        .then(response => {
          dispatch(receiveCategories(response.data)),
          error => console.log('an error occured fetching the categories', error)
        })
    },
    postListing: (listing) => {
      dispatch(postListing(listing))
      axios.post('/sellEntry/newListing', listing)
        .then(response => {
          dispatch(listingPostSuccessful()),
          error => {
            console.log('there was an error posting the listing', error)
            dispatch(listingPostFailure())
          };
        });
    },
    newListing: () => {
      dispatch(newListing());
    },
    closeModal: () => {
      dispatch(closeModal());
    }


  };
};

const SellEntryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellEntry);

export default SellEntryContainer;
