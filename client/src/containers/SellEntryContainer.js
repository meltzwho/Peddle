import { connect } from 'react-redux';
import axios from 'axios';
import {requestCategories, receiveCategories, postListing, listingPostSuccessful, listingPostFailure, newListing, closeModal} from '../actions/sellEntryAction';
import {clearUrls} from '../actions/imageUploadActions';
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
      dispatch(requestCategories());
      axios.get('/sellEntry/categories')
        .then(response => {
          dispatch(receiveCategories(response.data)),
          error => console.log('an error occured fetching the categories', error)
        });
    },
    postListing: (listing) => {
      //let redux store know the listing post has begun
      dispatch(postListing());
      //if the listing is local pickup, insert the address info to the db first, we need this data in the listing
      if (listing.allowPickup) {
        axios.post('/sellEntry/AssociateAddress', listing)
          .then(response => {
            //then we post listing to the db with the new address id
            listing.addressId = response.data.id_address;
            axios.post('/sellEntry/newListing', listing)
              .then(response => {
                //listing_id is required in the listing_image table, so we need to post the listing first
                listing.listingUrls.forEach((image) => {
                  //then for each image the user submitted we post it to the listing_image table
                  axios.post('/imageUpload/listingAndImage', {imageUrl: image, listingId: response.data.id_listing})
                    .then(imgResponse => {}, error => console.error('image association with listing failed', error));
                });
                //notify the redux store that the listing post was successful
                dispatch(listingPostSuccessful());
                //clear the image urls out of the redux store as their now in the db
                dispatch(clearUrls()),
                error => {
                  console.log('there was an error posting the listing', error);
                  //display listing post failure modal
                  dispatch(listingPostFailure());
                };
              });
          });
      } else {
        //same as above but without the associate address step
        //create the listing
        axios.post('/sellEntry/newListing', listing)
          .then(response => {
            listing.listingUrls.forEach((image) => {
              //associate the listing with each image that the user uploaded
              axios.post('/imageUpload/listingAndImage', {imageUrl: image, listingId: response.data.id_listing})
                .then(imgResponse => {}, error => console.error('image association with listing failed', error));
            });
            //let the redux store know that the post was successful
            dispatch(listingPostSuccessful());
            //clear the image urls from the redux store
            dispatch(clearUrls()),
            error => {
              //if the listing failed display the failure modal
              console.log('there was an error posting the listing', error);
              dispatch(listingPostFailure());
            };
          });
      }

    },
    newListing: () => {
      dispatch(newListing());
    },
    closeModal: () => {
      dispatch(closeModal());
    },
    editListing: (listing) => {
      //let redux store know the listing post has begun
      dispatch(postListing());
      //if the listing is local pickup, insert the address info to the db first, we need this data in the listing
      if (listing.allowPickup) {
        axios.post('/sellEntry/AssociateAddress', listing)
          .then(response => {
            //then we post listing to the db with the new address id
            listing.addressId = response.data.id_address;
            axios.post('/sellEntry/editListing', listing)
              .then(response => {
                //listing_id is required in the listing_image table, so we need to post the listing first
                listing.listingUrls.forEach((image) => {
                  //then for each image the user submitted we post it to the listing_image table
                  axios.post('/imageUpload/listingAndImage', {imageUrl: image, listingId: response.data.id_listing})
                    .then(imgResponse => {}, error => console.error('image association with listing failed', error));
                });
                //notify the redux store that the listing post was successful
                dispatch(listingPostSuccessful());
                //clear the image urls out of the redux store as their now in the db
                dispatch(clearUrls()),
                error => {
                  console.log('there was an error posting the listing', error);
                  //display listing post failure modal
                  dispatch(listingPostFailure());
                };
              });
          });
      } else {
        //same as above but without the associate address step
        //create the listing
        axios.post('/sellEntry/editListing', listing)
          .then(response => {
            listing.listingUrls.forEach((image) => {
              //associate the listing with each image that the user uploaded
              axios.post('/imageUpload/listingAndImage', {imageUrl: image, listingId: response.data.id_listing})
                .then(imgResponse => {}, error => console.error('image association with listing failed', error));
            });
            //let the redux store know that the post was successful
            dispatch(listingPostSuccessful());
            //clear the image urls from the redux store
            dispatch(clearUrls()),
            error => {
              //if the listing failed display the failure modal
              console.log('there was an error posting the listing', error);
              dispatch(listingPostFailure());
            };
          });
      }

    }


  };
};

const SellEntryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellEntry);

export default SellEntryContainer;
