import React from 'react';
import {Grid, Row, Modal, Col, Button, FormGroup, ControlLabel, FormControl, Radio, ListGroup, ListGroupItem} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

class FilterModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(JSON.stringify(this.state)));
    
  }

  handleClose(e) {
    if (e && e.target.value === 'clear') this.props.filter(undefined);
    if (e && e.target.value === 'apply') this.props.filter(this.state);
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Button bsStyle="default" onClick={this.handleShow}>
          FILTER RESULTS
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Filter search results...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid style={{width: '100%'}}>
              <Row>
                <Col xs={12} sm={6}>
                  <FormGroup>
                    <ControlLabel>
                      Min. Price
                    </ControlLabel>
                    <FormControl 
                      type='number'
                      name='minPrice'
                      placeholder='min. price'
                      onChange={
                        this.handleChange
                      }
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={6}>
                  <FormGroup>
                    <ControlLabel>
                      Max Price
                    </ControlLabel>
                    <FormControl 
                      type='number'
                      name='maxPrice'
                      placeholder='max price'
                      onChange={
                        this.handleChange
                      }
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12}>
                  <FormGroup>
                    <ControlLabel>
                      Condition
                    </ControlLabel>
                    <br />
                    <ListGroup>
                      <ListGroupItem>
                        <Radio name="condition" value='New' inline onFocus={this.handleChange}>
                          New
                        </Radio>{' '}
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio name="condition" value='Used' inline onFocus={this.handleChange}>
                          Used
                        </Radio>{' '}
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio name="condition" value='Open Box' inline onFocus={this.handleChange}>
                          Open Box
                        </Radio>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio name="condition" value='Reconditioned' inline onFocus={this.handleChange}>
                          Reconditioned
                        </Radio>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio name="condition" value='Other' inline onFocus={this.handleChange}>
                        Other
                        </Radio>
                      </ListGroupItem>
                    </ListGroup>
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12}>
                  <FormGroup>
                    <ControlLabel>
                      Delivery Method
                    </ControlLabel>
                    <br />
                    <ListGroup>
                      <ListGroupItem>
                        <Radio name="deliveryMethod" value='Local Pickup' inline onFocus={this.handleChange}>
                          Local Pickup
                        </Radio>{' '}
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio name="deliveryMethod" value='Shipping Available' inline onFocus={this.handleChange}>
                          Shipping Available
                        </Radio>{' '}
                      </ListGroupItem>
                    </ListGroup>
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12}>
                  <FormGroup>
                    <ControlLabel>
                      Min. Seller Rating
                    </ControlLabel>
                    <br />
                    <ListGroup>
                      <ListGroupItem>
                        <Radio name="sellerRating" value='5' inline onFocus={this.handleChange}>
                          <StarRatings 
                            rating={+5}
                            isAggregateRating="true"
                            starRatedColor="gold"
                            starSelectingHoverColor="yellow"
                            starDimension="16px"
                            starSpacing="0px"
                          />
                        </Radio>{' '}
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio name="sellerRating" value='4' inline onFocus={this.handleChange}>
                          <StarRatings 
                            rating={+4}
                            isAggregateRating="true"
                            starRatedColor="gold"
                            starSelectingHoverColor="yellow"
                            starDimension="16px"
                            starSpacing="0px"
                          />
                        </Radio>{' '}
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio name="sellerRating" value='3' inline onFocus={this.handleChange}>
                          <StarRatings 
                            rating={+3}
                            isAggregateRating="true"
                            starRatedColor="gold"
                            starSelectingHoverColor="yellow"
                            starDimension="16px"
                            starSpacing="0px"
                          />
                        </Radio>{' '}
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio name="sellerRating" value='2' inline onFocus={this.handleChange}>
                          <StarRatings 
                            rating={+2}
                            isAggregateRating="true"
                            starRatedColor="gold"
                            starSelectingHoverColor="yellow"
                            starDimension="16px"
                            starSpacing="0px"
                          />
                        </Radio>{' '}
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio name="sellerRating" value='1' inline onFocus={this.handleChange}>
                          <StarRatings 
                            rating={+1}
                            isAggregateRating="true"
                            starRatedColor="gold"
                            starSelectingHoverColor="yellow"
                            starDimension="16px"
                            starSpacing="0px"
                          />
                        </Radio>{' '}
                      </ListGroupItem>
                    </ListGroup>
                  </FormGroup>
                </Col>
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button
              value='clear'
              onClick={(e) => {
                this.handleClose(e);
              }}>
              Clear filters
            </Button>
            <Button
              value='apply'
              onClick={(e) => {
                this.handleClose(e);
              }}>
            Apply
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default FilterModal;