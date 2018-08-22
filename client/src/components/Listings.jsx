import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import {Grid, Row, Col, Label} from 'react-bootstrap';
import ListingCard from './ListingCard';
import FilterModal from './FilterModal';


class Listings extends Component {
  state = {
    listings: [],
    backup: []
  };
  
  componentDidMount() {
    Axios.get(`/l/${this.props.match.params.query}`)
      .then(listings=>this.setState({listings: listings.data}));
  }

  filter(filters) {
    if (filters !== undefined) {
      this.setState(prevState => ({backup: prevState.listings}), () => {
        if (filters.sellerRating) {
  
        }
        if (filters.minPrice) {
  
        }
        if (filters.maxPrice) {
  
        }
        if (filters.deliveryMethod) {
  
        }
        if (filters.condition) {
  
        }
        this.setState({});
      });
    } else {
      this.setState(prevState => ({listings: prevState.backup}));
    }
  }

  render() {
    this.filter = this.filter.bind(this);
    let searchTerm = this.props.match.params.query;
    var ListingCards = []; 
    for (let i = 0; i < this.state.listings.length; i++) {
      let listings = this.state.listings;
      ListingCards.push(
        <Col key={listings[i].id_listing} sm={12} md={4}>
          <ListingCard 
            key={listings[i].id_listing} 
            listing={listings[i]}
          />
        </Col>
      );
    }
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={12}>
            <FilterModal filter={this.filter} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} style={{marginTop: '5px'}}>
            <Label style={{fontSize: '1.5rem', fontStyle: 'italic'}}>{this.state.listings.length + ' listings found for ' + searchTerm}</Label>
          </Col>
        </Row>
        <Row style={{marginTop: '5px'}}>
          {ListingCards}
        </Row>
      </Grid>
    );
  }
}

export default withRouter(Listings);

