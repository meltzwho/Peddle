import React, { Component } from 'react';
import ListingCard from './ListingCard';

class Listings extends Component {
  render() {
    return (
      <div>
        <h2>Listings</h2>
        {this.props.listings.map(listing => {
          return (
            <ListingCard 
              key={listing.id_listing} 
              listing={listing}
            />
          );
        })}
      </div>
    );
  }
}

export default Listings;