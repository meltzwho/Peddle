import React, {Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel, InputGroup, Checkbox, Button, DropdownButton, MenuItem, ButtonToolbar, Radio, Modal, Popover, OverlayTrigger } from 'react-bootstrap';
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
    let userId = this.props.currentUserId ? this.props.currentUserId : 1;
    //pass the image urls from the redux store to the function
    //format the dollar input value to have 2 decimal points e.g (10.00) 
    this.setState({
      userId: userId,
      listingUrls: this.props.urls,
      productPrice: parseInt(this.state.productPrice).toFixed(2)
    },() => this.props.postListing(this.state));
   
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

  handleModalClose = () => {
    this.props.closeModal();
  }

  handleGoToListing = () => {
    this.props.history.push('/listingEntry');
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
            <Button onClick={this.handleModalClose}>New Listing</Button>
          </Modal.Footer>
        );
      }
      
      
      modal = 
      (
        <Modal show={this.props.entry.listingSuccessful !== null} onHide={this.handleModalClose}>
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
      <Popover id="popover-trigger-hover-focus" title="Just a heads up!">
        We won't show your exact location to buyers!
      </Popover>
    )

    return (
      <div>
        {modal}
        <Form>
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

          <FormGroup controlId="productPrice">
            <ControlLabel>Price</ControlLabel>
            <InputGroup>
              <InputGroup.Addon>$</InputGroup.Addon>
            </InputGroup>
            <FormControl 
              type="number"
              name="productPrice"
              value={this.state.productPrice}
              onChange={this.handleInputChange}
            />
          </FormGroup>

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

          {addressForm}

          <FormGroup onClick={this.handleCondition}>
            <Radio checked={this.state.productCondition==='new'} name='new' inline>New</Radio>{' '}
            <Radio checked={this.state.productCondition==='used'} name='used' inline>Used</Radio>{' '}
            <Radio checked={this.state.productCondition==='open-box'} name='open-box' inline>Open Box</Radio>{' '}
            <Radio checked={this.state.productCondition==='reconditioned'} name='reconditioned' inline>Reconditioned</Radio>{' '}
            <Radio checked={this.state.productCondition==='other'} name='other' inline>Other</Radio>{' '}
          </FormGroup>

          <FormGroup controlId="productQuantity">
            <ControlLabel>Quantity</ControlLabel>
            <FormControl 
              type="number"
              name="productQuantity"
              value={this.state.productQuantity}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          
          <ButtonToolbar>
            <DropdownButton
              title={this.state.selectedCategory || 'loading'}
              key={0}
              id="dropdown-size-medium"
            >
              {categories}
            </DropdownButton>
          </ButtonToolbar>


          <ImageUploadContainer />
          <p>images uploaded: {this.props.urls.length}</p>

          <Button onClick={this.handleListingSubmit} type="submit">Submit</Button>

        </Form>
      </div>
    );
  }
}

export default withRouter(SellEntry);