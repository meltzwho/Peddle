import React, {Component} from 'react';
import { FormGroup, FormControl, ControlLabel, InputGroup, Checkbox, Button } from 'react-bootstrap';

class SellEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleAllowPickup = this.handleAllowPickup.bind(this);
    this.handleAllowShipping = this.handleAllowShipping.bind(this);
    this.handleListingSubmit = this.handleListingSubmit.bind(this);
  }

  handleProductChange(event) {
    this.setState({
      productName: event.target.value
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      productDescription: event.target.value
    });
  }

  handlePriceChange(event) {
    this.setState({
      productPrice: event.target.value
    });
  }

  handleAllowPickup() {
    this.setState({
      allowPickup: !this.state.allowPickup
    });
  }

  handleAllowShipping() {
    this.setState({
      allowShipping: !this.state.allowShipping
    });
  }

  handleListingSubmit(event) {
    event.preventDefault();
    console.log('state', this.state);
  }

  componentDidMount() {
    this.setState(this.props.entry);
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="productTitle">
            <ControlLabel>What are you selling?</ControlLabel>
            <FormControl 
              type="text"
              value={this.state.productName}
              placeholder="Enter product name"
              onChange={this.handleProductChange}
            />
          </FormGroup>

          <FormGroup controlId="productDescription">
            <ControlLabel>Description</ControlLabel>
            <FormControl 
              type="text"
              value={this.state.productDescription}
              placeholder="Tell us about the product you're selling"
              onChange={this.handleDescriptionChange}
            />
          </FormGroup>

          <FormGroup controlId="productPrice">
            <ControlLabel>Price</ControlLabel>
            <InputGroup>
              <InputGroup.Addon>$</InputGroup.Addon>
            </InputGroup>
            <FormControl 
              type="number"
              value={this.state.productPrice}
              onChange={this.handlePriceChange}
            />
          </FormGroup>

          <FormGroup controlId="productDeliveryMethod">
            <Checkbox onChange={this.handleAllowPickup}>Local Pickup</Checkbox>
            <Checkbox onChange={this.handleAllowShipping}>Shipping Available</Checkbox>
          </FormGroup>

          <Button onClick={this.handleListingSubmit} type="submit">Submit</Button>

        </form>
      </div>
    );
  }
}

export default SellEntry;