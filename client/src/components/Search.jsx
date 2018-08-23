import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

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
    this.setState({
      input: ''
    });
  }

  render() {
    return (
      <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl
            type="text"
            value={this.state.input}
            placeholder="Search for items near you"
            onChange={e => {this.handleInputChange(e)}}
          />
          <Button
            bsStyle="primary"
            type="submit"
            inline
            // style={{marginTop: '2.5px'}}
            onClick={e => {
              if (this.state.input.trim() !== '') {
                this.state.input = this.state.input.trim();
                this.handleSubmit(e, this.state.input);
                this.props.history.push(`/listings/${this.state.input}`);
              }
            }}
          >
            Search
          </Button>
        </FormGroup>
      </Navbar.Form>
    );
  }
}

export default withRouter(Search);