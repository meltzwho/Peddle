import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';

class ImageUpload extends Component {
  state = {};
  
  onDrop = (picture) => {
    for (let i = 0; i < picture.length; i++) {
      let formData = new FormData();
      formData.append('file', picture[i]);
      this.props.uploadImage(formData);
    }
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