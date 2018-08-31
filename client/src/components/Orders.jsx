import React, { Component } from 'react';
import { Button, Modal, Tabs, Tab, Grid, Jumbotron, Row, Well, Panel, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import OrdersItem from './OrdersItem';

class Orders extends Component {
  state = {}

  componentDidMount() {
    let userId = this.props.currentUserId;
    this.props.fetchUserOrders(userId);
  }

  completeOrder = (order) => {
    console.log('order', order)
    this.props.completeOrder({orderLineId: order.id_line_item, userId: this.props.currentUserId});
    // to={`/reviewEntryForm/${listing.id_listing}`}>
  }


  render() {
    let activeTiles = this.props.orders.orders.active.length > 0 ?
      this.props.orders.orders.active.map((order) => (<OrdersItem key={order.id_order} order={order} active={true} completeOrder={this.completeOrder} />)) : <Well style={{margin: "20px"}}>Looks like you don't have any active orders</Well>;
    let completedTiles = this.props.orders.orders.completed.length > 0 ? 
      this.props.orders.orders.completed.map((order) => (<OrdersItem key={order.id_order} order={order} active={false} />)) : <Well style={{margin: "20px"}}>Looks like you don't have any completed orders</Well>;
    return (
      <Grid>
        <Panel>
          <Modal show={this.props.orders.ordersFetchSuccess === false} onHide={this.props.closeFailModal}>
            <Modal.Header>
              <Modal.Title>Sorry!</Modal.Title>
            </Modal.Header>
            <Modal.Body>We weren't able to fetch your orders. Please try again later</Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.closeFailModal}>Close</Button>
            </Modal.Footer>
          </Modal>
      
          <Jumbotron style={{borderRadius: 'unset'}}>
            <h2>Your Orders</h2>
          </Jumbotron>
          <Row>
            <Col xsOffset={1}>
              <Tabs defaultActiveKey={1} id="buyer-orders" style={{width: '90%'}}>
                <Tab eventKey={1} title={`Active (${this.props.orders.orders.active.length})`}>
                  {activeTiles}
                </Tab>
                <Tab eventKey={2} title={`Completed (${this.props.orders.orders.completed.length})`}>
                  {completedTiles}
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Panel>
      </Grid>
    );
  }
}

export default withRouter(Orders);