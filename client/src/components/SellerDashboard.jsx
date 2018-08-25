import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Button, Modal, Tabs, Tab, Grid, Col, Row, Jumbotron, Well } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import SellerDashboardItem from './sellerDashBoardItem';



class SellerDashboard extends Component {
  state = {is_seller: false};

  componentDidMount() {
    let userId = this.props.currentUserId ? this.props.currentUserId : 1;
    this.props.fetchUserListings(userId);
    const cookies = new Cookies;
    let cookie = cookies.get('stripe');
    if (cookie !== undefined) {
      cookie = JSON.parse(cookie.slice(2));
      
      Axios.post('/users/stripe', {userId: userId, stripe_user_id: cookie.stripe_user_id})
        .then(() => this.setState({is_seller: true}));
    } else {
      Axios.get(`/users/userId/${userId}`)
        .then(res =>{          
          this.setState({is_seller: res.data[0].is_seller !== null})
        });
    }
  }

  edit = (e, listing) => {
    this.props.editListing(listing);
    this.props.history.push('/sellEntry');
  }


  render() {
 
    let activeTiles = this.props.listings.listings.active.length > 0 ? 
      this.props.listings.listings.active.map((listing) => (<SellerDashboardItem key={listing.id_listing} edit={(e, listing)=>this.edit(e, listing)} listing={listing} active={true} showProgress={true} />)) : <Well style={{margin: "20px"}}>Looks like you don't have any active listings</Well>;
    let completedTiles = this.props.listings.listings.completed > 0 ? 
      this.props.listings.listings.completed.map((listing) => (<SellerDashboardItem key={listing.id_listing} listing={listing} active={false} showProgress={true} />)) : <Well style={{margin: "20px"}}>Looks like you don't have any completed listings</Well>;

    return (
      <Grid>
        <Modal show={this.props.listings.listingFetchSuccess === false} onHide={this.props.closeFailModal}>
          <Modal.Header>
            <Modal.Title>Sorry!</Modal.Title>
          </Modal.Header>
          <Modal.Body>We weren't able to fetch your listings. Please try again later</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeFailModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Jumbotron>
          <Row>
            <h2>Seller Dashboard</h2> 
            <Col xs={18} md={4} mdOffset={10}>
              <Button href={this.state.is_seller === true ? '/sellEntry' : '/stripe/auth'} bsStyle="primary" bsSize="large">List a New Item</Button>
            </Col>
          </Row>
        </Jumbotron>
        
        
        <Row>
          <h3>Your Listings</h3>
        </Row>

        <Row>
          <Tabs defaultActiveKey={1} id="seller-listings">
            <Tab eventKey={1} title={`Active (${this.props.listings.listings.active.length})`}>
              {activeTiles}
            </Tab>
            <Tab eventKey={2} title={`Completed (${this.props.listings.listings.completed.length})`}>
              {completedTiles}
            </Tab>
          </Tabs>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(SellerDashboard);