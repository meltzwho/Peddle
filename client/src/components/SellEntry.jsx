import React, {Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel, InputGroup, Checkbox, Button, DropdownButton, MenuItem, ButtonToolbar, Radio, Modal, FieldGroup } from 'react-bootstrap';

class SellEntry extends Component {
  state = {}

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSelectboxChange = (e) => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  handleListingSubmit = (e) => {
    e.preventDefault();
    console.log('state', this.state);
    this.props.postListing(this.state);
  }

  handleCategorySelection = (category) => {
    this.setState({
      selectedCategory: category.category,
      selectedCategoryId: category.id_category
    })
  }

  handleCondition = (e) => {
    this.setState({ 
      productCondition: e.target.name
    });
  }

  handleNewListing = () => {
    this.props.newListing();
    this.setState(this.props.entry);
    this.setState({})
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.setState(this.props.entry);
  }

  render() {
    let categories = this.props.entry.categories.map((category) => {
      return <MenuItem onClick={() => this.handleCategorySelection(category)} key={category.id_category} eventKey={category.id_category}>{category.category}</MenuItem>
    })
    let modal = null;
    if (this.props.entry.listingSuccessful === true || this.props.entry.listingSuccessful === false) {
      let modalTitle = null;
      let modalDescription = null;
      let modalFooter = null;
      if (this.props.entry.listingSuccessful === true) {
        modalTitle = "You're listing was successfully created!";
        modalDescription = "Would you like to add another listing or return home?";
        modalFooter =         
        <Modal.Footer>
          <Button onClick={this.handleNewListing}>New Listing</Button>
          <Button onClick={this.handleGoHome}>Home</Button>
        </Modal.Footer>
      } else {
        modalTitle = "We're sorry we had an issue creating this listing";
        modalDescription = "Please try again!"
        modalFooter = 
        <Modal.Footer>
          <Button onClick={this.handleModalClose}>New Listing</Button>
        </Modal.Footer>
      }
      
      
      modal = 
      <Modal show={this.props.entry.listingSuccessful!==null} onHide={this.handleModalClose}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalDescription}</Modal.Body>
        {modalFooter}
      </Modal>
    }

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
            <Checkbox 
              name="allowPickup"
              onClick={this.handleSelectboxChange}
              checked={this.state.allowPickup}
              inline>
                Local Pickup
            </Checkbox>
            <Checkbox
              name="allowShipping"
              onClick={this.handleSelectboxChange}
              checked={this.state.allowShipping}
              inline>
                Shipping Available
            </Checkbox>
          </FormGroup>

          
          <ButtonToolbar>
            <DropdownButton
              title={this.state.selectedCategory}
              key={0}
              id="dropdown-size-medium"
            >
            {categories}
            </DropdownButton>
          </ButtonToolbar>

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

          <FieldGroup
            id="formControlsFile"
            type="file"
            label="File"
            help="Example block-level help text here."
          />


          <Button onClick={this.handleListingSubmit} type="submit">Submit</Button>

        </Form>
      </div>
    );
  }
}

export default SellEntry;