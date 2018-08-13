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
  handleSubmit = (e, value) => {
    e.preventDefault();
    this.props.handleSubmit(value);
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
            onChange={e => {this.handleInputChange(e)}}
          />
          <Button
            bsStyle="primary"
            type="submit"
            onClick={e => {this.handleSubmit(e, this.state.input)}}
          >
            Submit
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default Search;