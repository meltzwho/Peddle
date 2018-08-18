import React, { Component } from 'react';
import { Button, Modal, Tabs, Tab } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import SellerDashboardItem from './sellerDashBoardItem';

class SellerDashboard extends Component {
  state = {}

  componentDidMount() {
    let userId = this.props.currentUserId ? this.props.currentUserId : 1;
    this.props.fetchUserListings(userId);
  }

  newListing = (e) => {
    this.props.history.push('/sellEntry');
  }

  edit = (e, listing) => {
    this.props.editListing(listing);
    this.props.history.push('/sellEntry');
  }


  render() {

    let activeTiles = this.props.listings.listings.active.map((listing) => (<SellerDashboardItem key={listing.id_listing} edit={(e, listing)=>this.edit(e, listing)} listing={listing} active={true} />));
    let completedTiles = this.props.listings.listings.completed.map((listing) => (<SellerDashboardItem key={listing.id_listing} listing={listing} active={false} />))

    return (
      <div>
        <h2>Seller Dashboard</h2>
        <Modal show={this.props.listings.listingFetchSuccess === false} onHide={this.props.closeFailModal}>
          <Modal.Header>
            <Modal.Title>Sorry!</Modal.Title>
          </Modal.Header>
          <Modal.Body>We weren't able to fetch your listings. Please try again later</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeFailModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        
        
        <Button onClick={this.newListing} bsStyle="primary" bsSize="large">List a New Item</Button>
      
        <h3>Your Listings</h3>

        <Tabs defaultActiveKey={1} id="seller-listings">
          <Tab eventKey={1} title={`Active (${this.props.listings.listings.active.length})`}>
            {activeTiles}
          </Tab>
          <Tab eventKey={2} title={`Completed (${this.props.listings.listings.completed.length})`}>
            {completedTiles}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(SellerDashboard);