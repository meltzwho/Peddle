import React, {Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel, InputGroup, Checkbox, Button, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

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

  handleListingSubmit = (event) => {
    event.preventDefault();
    console.log('state', this.state);
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.setState(this.props.entry);
  }

  render() {
    // let categories = this.props.categories.map((category) => {
    //   return <MenuItem eventKey={category.id_category}>{category.category}</MenuItem>
    // })

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
              name="allowPickup"
              onClick={this.handleSelectboxChange}>
                Local Pickup
            </Checkbox>
            <Checkbox
              name="allowShipping"
              onClick={this.handleSelectboxChange}>
                Shipping Available
            </Checkbox>
          </FormGroup>

          
          <ButtonToolbar>
            <DropdownButton
              title="category"
              key={0}
              id="dropdown-size-medium"
            >
            {/* {categories} */}
            </DropdownButton>
          </ButtonToolbar>

          <Button onClick={this.handleListingSubmit} type="submit">Submit</Button>

        </Form>
      </div>
    );
  }
}

export default SellEntry;