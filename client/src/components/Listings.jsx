import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import ListingCard from './ListingCard';

class Listings extends Component {
  state = {
    listings: []
  };

  componentDidMount() {
    Axios.get('/l')
      .then(listings=>this.setState({listings: listings.data}));
  }

  render() {
    let searchTerm = this.props.match.params.input;
    return (
      <div>
        <h2>{this.state.listings.length + ' listings found for ' + searchTerm}</h2>
        {this.state.listings.map(listing => {
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

export default withRouter(Listings);