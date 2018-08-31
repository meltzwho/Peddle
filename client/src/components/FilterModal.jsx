import React from 'react';
import {Grid, Row, Modal, Col, Button, FormGroup, ControlLabel, FormControl, Radio, ListGroup, ListGroupItem} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

class FilterModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      filters: {}
    };
  }

  handleChange = (e) => {
    this.setState({
      filters: {...this.state.filters, [e.target.name]: e.target.value}
    });
    
  }

  handleClose(e) {
    if (e && e.target.value === 'clear') this.setState({filters: {}}, ()=>this.props.filter(this.state.filters));
    if (e && e.target.value === 'apply') this.props.filter(this.state.filters);
    this.setState({ show: false });
  }

  handleShow() {
    //this.setState({filters: {}});
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
                      value={this.state.filters.minPrice}
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
                      value={this.state.filters.maxPrice}
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
                        <Radio checked={this.state.filters.condition === 'new'} name="condition" value='new' inline onClick={this.handleChange}>
                          New
                        </Radio>{' '}
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio checked={this.state.filters.condition === 'used'} name="condition" value='used' inline onClick={this.handleChange}>
                          Used
                        </Radio>{' '}
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio checked={this.state.filters.condition === 'open-box'} name="condition" value='open-box' inline onClick={this.handleChange}>
                          Open Box
                        </Radio>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio checked={this.state.filters.condition === 'reconditioned'} name="condition" value='reconditioned' inline onClick={this.handleChange}>
                          Reconditioned
                        </Radio>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio checked={this.state.filters.condition === 'other'} name="condition" value='other' inline onClick={this.handleChange}>
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
                        <Radio checked={this.state.filters.deliveryMethod === 'is_local'} name="deliveryMethod" value='is_local' inline onClick={this.handleChange}>
                          Local Pickup
                        </Radio>{' '}
                      </ListGroupItem>
                      <ListGroupItem>
                        <Radio checked={this.state.filters.deliveryMethod === 'is_shipping'} name="deliveryMethod" value='is_shipping' inline onClick={this.handleChange}>
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
                        <Radio checked={this.state.filters.sellerRating === '5'} name="sellerRating" value='5' inline onClick={this.handleChange}>
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
                        <Radio checked={this.state.filters.sellerRating === '4'} name="sellerRating" value='4' inline onClick={this.handleChange}>
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
                        <Radio checked={this.state.filters.sellerRating === '3'} name="sellerRating" value='3' inline onClick={this.handleChange}>
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
                        <Radio checked={this.state.filters.sellerRating === '2'} name="sellerRating" value='2' inline onClick={this.handleChange}>
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
                        <Radio checked={this.state.filters.sellerRating === '1'} name="sellerRating" value='1' inline onClick={this.handleChange}>
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