import React, {Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel, InputGroup, Checkbox, Button } from 'react-bootstrap';

class SellEntry extends Component {
  state = {
    productName: '',
    description: '',
    price: 0,
    isLocal: false,
    isShipping: false
  }

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

  handleListingSubmit = (event) => {
    event.preventDefault();
    console.log('state', this.state);
    this.setState({
      productName: '',
      description: '',
      price: 0,
      isLocal: false,
      isShipping: false
    })
  }

  render() {
    return (
      <div>
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
              name="description"
              value={this.state.description}
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
              name="price"
              value={this.state.price}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup controlId="productDeliveryMethod">
            <Checkbox 
              name="isLocal"
              onClick={this.handleSelectboxChange}>
                Local Pickup
            </Checkbox>
            <Checkbox
              name="isShipping"
              onClick={this.handleSelectboxChange}>
                Shipping Available
            </Checkbox>
          </FormGroup>

          <Button onClick={this.handleListingSubmit} type="submit">Submit</Button>

        </Form>
      </div>
    );
  }
}

export default SellEntry;