import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import {Grid, Row, Col, Modal, Label, Button, Popover, Tooltip, OverlayTrigger} from 'react-bootstrap';
import ListingCard from './ListingCard';


class Listings extends Component {
  state = {
    listings: []
  };

  componentDidMount() {
    Axios.get(`/l/${this.props.match.params.query}`)
      .then(listings=>this.setState({listings: listings.data}));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
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
            <Example />
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

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
      <div>
        <Button bsStyle="default" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}