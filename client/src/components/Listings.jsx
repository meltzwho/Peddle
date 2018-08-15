import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import {Grid, Row, Col} from 'react-bootstrap';
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
    var ListingCards = []; 
    for (let i = 0; i < this.state.listings.length; i++) {
      let listings = this.state.listings;
      ListingCards.push(
        <Col key={listings[i].id_listing} xs={12} sm={4}>
          <ListingCard 
            key={listings[i].id_listing} 
            listing={listings[i]}
          />
        </Col>
      );
    }
      
    return (
      <div>
        <h2>{this.state.listings.length + ' listings found for ' + searchTerm}</h2>
        <Grid>
          <Row>
            {ListingCards}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Listings);