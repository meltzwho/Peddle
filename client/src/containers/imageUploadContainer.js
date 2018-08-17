import { connect } from 'react-redux';
import axios from 'axios';
import { uploadImageStart, uploadImageComplete } from '../actions/imageUploadActions';
import ImageUpload from '../components/imageUpload';

const mapStateToProps = (state) => {
  return {
    urls: state.imageData.imageUrls
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    uploadImage: (image) => {
      dispatch(uploadImageStart());
      axios.post('/imageUpload/newImage', image)
        .then(response => { 
          dispatch(uploadImageComplete(response.data.Location)),
          error => console.error('an error occured uploading the image to aws', error);
        });
    }

  };
};

const imageUploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageUpload);

export default imageUploadContainer;
