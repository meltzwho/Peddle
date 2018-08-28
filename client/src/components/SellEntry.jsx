import React, {Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, Button, DropdownButton, MenuItem, ButtonToolbar, Radio, Modal, Popover, OverlayTrigger, Grid, Col, Row, Jumbotron, Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ImageUploadContainer from '../containers/imageUploadContainer';

class SellEntry extends Component {
  state = {}
  
  componentDidMount() {
    this.props.fetchCategories();
    this.setState(this.props.entry);
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSelectboxChange = (e) => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  handleListingSubmit = (e) => {
    e.preventDefault();
    //default user id for dev purposes
    let userId = this.props.currentUserId;
    //pass the image urls from the redux store to the function
    //format the dollar input value to have 2 decimal points e.g (10.00) 
    if(this.props.entry.listingEdit) {
      this.setState({
        userId: userId,
        listingUrls: this.props.urls,
        productPrice: parseInt(this.state.productPrice).toFixed(2)
      },() => this.props.editListing(this.state));
    } else {
      this.setState({
        userId: userId,
        listingUrls: this.props.urls,
        productPrice: parseInt(this.state.productPrice).toFixed(2)
      },() => this.props.postListing(this.state));
    }
  }


  handleCategorySelection = (category) => {
    this.setState({
      selectedCategory: category.category,
      selectedCategoryId: category.id_category
    });
  }

  handleCondition = (e) => {
    this.setState({ 
      productCondition: e.target.name
    });
  }

  handleNewListing = () => {
    this.props.newListing();
    this.setState(this.props.entry);
  }

  handleGoToListing = () => {
    this.props.closeModal();
    this.props.history.push('/sellerDashboard');
  }


  render() {
    let categories = this.props.entry.categories.map((category) => {
      return <MenuItem onClick={() => this.handleCategorySelection(category)} key={category.id_category} eventKey={category.id_category}>{category.category}</MenuItem>
    });
    let modal = null;
    if (this.props.entry.listingSuccessful === true || this.props.entry.listingSuccessful === false) {
      let modalTitle = null;
      let modalDescription = null;
      let modalFooter = null;
      if (this.props.entry.listingSuccessful === true) {
        modalTitle = 'You\'re listing was successfully created!';
        modalDescription = 'Would you like to add another listing or return home?';
        modalFooter =         
        (
          <Modal.Footer>
            <Button onClick={this.handleNewListing}>New Listing</Button>
            <Button onClick={this.handleGoToListing}>Listing Page</Button>
          </Modal.Footer>
        );
      } else {
        modalTitle = 'We\'re sorry we had an issue creating this listing';
        modalDescription = 'Please try again!';
        modalFooter = 
        (
          <Modal.Footer>
            <Button onClick={this.props.closeModal}>New Listing</Button>
          </Modal.Footer>
        );
      }
      
      
      modal = 
      (
        <Modal show={this.props.entry.listingSuccessful !== null} onHide={this.props.closeModal}>
          <Modal.Header>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalDescription}</Modal.Body>
          {modalFooter}
        </Modal>
      );
    }

    let addressForm = null;
    if (this.state.allowPickup === true) {
      addressForm = (
        <div>
          
          <FormGroup controlId="streetAddress">
            <ControlLabel>Street Address</ControlLabel>
            <FormControl 
              type="text"
              name="streetAddress"
              value={this.state.streetAddress}
              placeholder="123 Main Street"
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="city">
            <ControlLabel>City</ControlLabel>
            <FormControl 
              type="text"
              name="cityAddress"
              value={this.state.cityAddress}
              placeholder="New York"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <ControlLabel>State</ControlLabel>
            <FormControl 
              type="text"
              name="stateAddress"
              value={this.state.stateAddress}
              placeholder="NY"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <ControlLabel>Zip Code</ControlLabel>
            <FormControl 
              type="text"
              name="zipCodeAddress"
              value={this.state.zipCodeAddress}
              placeholder="10016"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          
        </div>
      );
    }

    let pickupPopover = (
      <Popover id="popover-trigger-hover-focus" title="Don't Worry!">
        We won't show your exact location to buyers!
      </Popover>
    );

    let pictures = this.props.urls.map((url, i) => (
      <Col key={i} xs={6} md={4}>
        <Image src={url} thumbnail/>
      </Col>
    ));

    return (
      <Grid>
        <Jumbotron>
          <h2>Create Your Listing!</h2>
        </Jumbotron>
        {modal}
        <Form>
          <Row>
            <Col xs={12} md={8}>
              <Row>
                <FormGroup controlId="productTitle">
                  <ControlLabel>What are you selling?</ControlLabel>
                  <FormControl 
                    type="text"
                    name="productName"
                    value={this.state.productName}
                    placeholder="Enter product name"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Row>

              <Row>
                <FormGroup controlId="productDescription">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl 
                    type="text"
                    name="productDescription"
                    value={this.state.productDescription}
                    placeholder="Tell us about the product you're selling"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Row>
            </Col>

            <Col xs={6} md={4}>
              <p>images uploaded: {this.props.urls.length}</p>
              <ImageUploadContainer />
              <p>Please see below for previews of your images</p>
            </Col>
          </Row>


          <Row style={{marginTop: "30px"}}>
            <Col xs={9} md={1} mdPush={1}>
              <FormGroup controlId="productPrice">
                <ControlLabel>Price</ControlLabel>
                <FormControl 
                  type="number"
                  name="productPrice"
                  value={this.state.productPrice}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col xs={9} md={1} mdPush={2}>
              <FormGroup controlId="productQuantity">
                <ControlLabel>Quantity</ControlLabel>
                <FormControl 
                  type="number"
                  name="productQuantity"
                  value={this.state.productQuantity}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col xs={9} md={4} mdPush={3}>
              <FormGroup onClick={this.handleCondition}>
                <ControlLabel>Condition</ControlLabel> <br />
                <Radio checked={this.state.productCondition==='new'} name='new' inline>New</Radio>{' '}
                <Radio checked={this.state.productCondition==='used'} name='used' inline>Used</Radio>{' '}
                <Radio checked={this.state.productCondition==='open-box'} name='open-box' inline>Open Box</Radio>{' '}
                <br />
                <Radio checked={this.state.productCondition==='reconditioned'} name='reconditioned' inline>Reconditioned</Radio>{' '}
                <Radio checked={this.state.productCondition==='other'} name='other' inline>Other</Radio>{' '}
              </FormGroup>
            </Col>
            <Col xs={9} md={1} mdPush={3}>
              <ButtonToolbar>
                <ControlLabel>Category</ControlLabel> <br />
                <DropdownButton
                  title={this.state.selectedCategory || 'loading'}
                  key={0}
                  id="dropdown-size-medium"
                >
                  {categories}
                </DropdownButton>
              </ButtonToolbar>
            </Col>
          </Row>
          <br />
          <Row style={{marginTop: "30px"}}>
            <Col xs={12} md={12}>
              <FormGroup controlId="productDeliveryMethod">
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="top"
                  overlay={pickupPopover}
                >
                  <Checkbox 
                    name="allowPickup"
                    onClick={this.handleSelectboxChange}
                    checked={this.state.allowPickup}
                    inline
                  >
                    Local Pickup
                  </Checkbox>
                </OverlayTrigger>
                <Checkbox
                  name="allowShipping"
                  onClick={this.handleSelectboxChange}
                  checked={this.state.allowShipping}
                  inline
                >
                    Shipping Available
                </Checkbox>
              </FormGroup>
            </Col>
          </Row>

          {addressForm}


          <Row style={{marginTop: "30px"}}>
            <Button onClick={this.handleListingSubmit} type="submit">Submit</Button>
          </Row>
        </Form>
        <Row style={{marginTop: "30px"}}>
          {pictures} 
        </Row>
      </Grid>
    );
  }
}

export default withRouter(SellEntry);