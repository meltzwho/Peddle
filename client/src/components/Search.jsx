import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class Search extends Component {
  state = {
    input: ''
  }
  handleInputChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }
  render() {
    return (
      <Form>
        <FormGroup>
          <ControlLabel>Search</ControlLabel>
          <FormControl
            type="text"
            value={this.state.input}
            placeholder="Search for items near you"
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Button
            bsStyle="primary"
            type="submit"
          >
            Submit
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default Search;