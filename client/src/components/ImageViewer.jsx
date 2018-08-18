import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

class ImageViewer extends Component {
  render() {
    if (this.props.images === undefined) {
      return null;
    } else if (this.props.images.length === 0 ) {
      return (
        <Image src='/assets/No-image-available.jpg' alt='no image available' />
      );
    } else {
      return (
        <ImageGallery 
          items={this.props.images} 
          showBullets={false}
          showFullscreenButton={true}
          showPlayButton={false}
          thumbnailPosition={'bottom'}
        />
      );
    }
  }
}

export default ImageViewer;