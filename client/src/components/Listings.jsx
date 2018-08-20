import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import {Grid, Row, Col, DropdownButton, MenuItem, Label} from 'react-bootstrap';
import ListingCard from './ListingCard';


class Listings extends Component {
  state = {
    listings: []
  };

  componentDidMount() {
    Axios.get(`/l/${this.props.match.params.query}`)
      .then(listings=>this.setState({listings: listings.data}));
  }

  render() {
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
    var title = 'default';  
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} sm={12}>
              <DropdownButton
                bsStyle={title.toLowerCase()}
                style={{marginBottom: '5px'}}
                title={title}
                key={title}
                id={`dropdown-basic-${title}`}
              >
                <MenuItem eventKey="1">Action</MenuItem>
              </DropdownButton>
              <Label style={{margin: '5px', fontSize: '1.5rem', fontStyle: 'italic'}}>{this.state.listings.length + ' listings found for ' + searchTerm}</Label>
            </Col>
          </Row>
          <Row>
            {ListingCards}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Listings);