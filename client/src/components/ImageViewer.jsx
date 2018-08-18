import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

class ImageViewer extends Component {
  render() {
    if (this.props.images !== undefined) {
      return (
        <ImageGallery 
          items={this.props.images} 
          showBullets={false}
          showFullscreenButton={true}
          showPlayButton={false}
          thumbnailPosition={"bottom"}
          
        />
      );
    } else {
      return null;
    }
  }
}

export default ImageViewer;