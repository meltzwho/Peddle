import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import {Grid, Row, Col, Label} from 'react-bootstrap';
import ListingCard from './ListingCard';
import FilterModal from './FilterModal';


class Listings extends Component {
  state = {
    listings: []
  };
  
  componentDidMount() {
    Axios.get(`/l/${this.props.match.params.query}`)
      .then(listings=>this.setState({listings: listings.data}));
  }

  filter(filters) {
    this.setState(prevState => { if (prevState.backup !== undefined) return {listings: prevState.backup}; else return {}; }, ()=>{
      if (Object.keys(filters).length !== 0) {
        this.setState(prevState => { if (prevState.backup === undefined) return {backup: prevState.listings}; else return {}; }, () => {
          let listings = this.state.listings;
          let filteredlistings = [];
          for (let i = 0; i < listings.length; i++) {
            if (filters.sellerRating && listings[i].rating < filters.sellerRating) {
              continue;
            }
            if (filters.minPrice && listings[i].price < Number(filters.minPrice)) {
              continue;
            }
            if (filters.maxPrice && listings[i].price > Number(filters.maxPrice)) {
              continue;
            }
            if (filters.deliveryMethod && listings[i][filters.deliveryMethod] < 1) {
              continue;
            }
            if (filters.condition && listings[i].condition !== filters.condition) {
              continue;
            }
            filteredlistings.push(listings[i]);
          }
          this.setState({listings: filteredlistings});
        });
      }
    });
  }

  render() {
    this.filter = this.filter.bind(this);
    let searchTerm = this.props.match.params.query;
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
      <Grid style={{width: '90%', marginTop: '5px'}}>
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

