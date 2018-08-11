import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class SellEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productValue: '',
      productDescription: '',
      productPrice: 0
    };
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleProductChange(event) {
    this.setState({
      productValue: event.target.value
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

  render() {
    return (
      <div>
        <FormGroup  
          controlId="sellEntryForm"
        >
          <ControlLabel>What are you selling?</ControlLabel>
          <FormControl 
            type="text"
            value={this.state.productValue}
            placeholder="Enter product name"
            onChange={this.handleProductChange}
          />

          <ControlLabel>Description</ControlLabel>
          <FormControl 
            type="text"
            value={this.state.productDescription}
            placeholder="Tell us about the product you're selling"
            onChange={this.handleDescriptionChange}
          />

          <ControlLabel>Price</ControlLabel>
          <FormControl 
            type="number"
            value={this.state.productPrice}
            onChange={this.handlePriceChange}
          />
          

        </FormGroup>
      </div>
    );
  }
}

export default SellEntry;