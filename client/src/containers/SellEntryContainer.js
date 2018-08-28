import { connect } from 'react-redux';
import {fetchCategories, postListing, editListing, newListing, closeModal} from '../actions/sellEntryAction';
import SellEntry from '../components/SellEntry';

const mapStateToProps = (state) => {
  return {
    entry: state.sellEntryForm,
    urls: state.imageData.imageUrls,
    currentUserId: state.user.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchCategories: () => {
      dispatch(fetchCategories());
    },
    postListing: (listing) => {
      dispatch(postListing(listing));
    },
    newListing: () => {
      dispatch(newListing());
    },
    closeModal: () => {
      dispatch(closeModal());
    },
    editListing: (listing) => {
      dispatch(editListing(listing));
    }


  };
};

const SellEntryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellEntry);

export default SellEntryContainer;
