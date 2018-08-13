
import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class Search extends Component {
  render() {
    return (
      <Form >
        <FormGroup>
          <ControlLabel>Search</ControlLabel>
          <FormControl
            type="text"
            value={this.props.input}
            placeholder="Search for items near you"
            onChange={this.props.handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Button
            bsStyle="primary"
            type="submit"
            // onClick={(e) => this.handleSubmit(e, this.state.value, this.state.startTime, this.state.endTime)}
            // disabled={this.state.isLoading}>
          >
            Submit
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default Search;