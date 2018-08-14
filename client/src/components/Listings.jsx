import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ListingCard from './ListingCard';

class Listings extends Component {
  render() {
    let searchTerm = this.props.match.params.input;
    return (
      <div>
        <h2>Listings</h2>
        {/* {this.props.listings.map(listing => {
          return (
            <ListingCard 
              key={listing.id_listing} 
              listing={listing}
            />
          );
        })} */}
      </div>
    );
  }
}

export default withRouter(Listings);