import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';

class ImageUpload extends Component {
  state = {imageUploads: 1};
  
  onDrop = (picture) => {
    if (this.state.imageUploads % 2) {
      for (let i = 0; i < picture.length; i++) {
        let formData = new FormData();
        formData.append('file', picture[i]);
        if (picture[i]) {
          this.props.uploadImage(formData);
        }
        delete picture[i];
      }
      
    }
    this.state.imageUploads++;
  };

  render() {
    return (
      <div>
        <ImageUploader 
          withLabel={false}
          withIcon={false}
          buttonText='Upload Image'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.png']}
          maxFileSize={5232880}
        />
      </div>
    );
  }

}

export default ImageUpload;