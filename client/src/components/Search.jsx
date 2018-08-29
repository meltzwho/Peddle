import React, { Component } from 'react';
import { Navbar, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
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
  keyPress = (e) => {
    if (e.charCode === 13) {
      this.handleSubmit(e, this.state.input);
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.input.trim() !== '') {
      this.setState({
        input: this.state.input.trim()
      }, () => {
        this.props.handleSubmit(this.state.input);
        this.setState({
          input: ''
        });
        this.props.history.push(`/listings/${this.state.input}`);
      });
    }
  }

  render() {
    return (
      <Navbar.Form pullLeft>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              value={this.state.input}
              placeholder="Search for items near you"
              onChange={e => {this.handleInputChange(e)}}
              onKeyPress={this.keyPress}
            />
            <InputGroup.Button>
              <Button
                bsStyle="primary"
                type="submit"
                // style={{marginTop: '2.5px'}}
                onClick={e => {this.handleSubmit(e)}}
              >
                Search
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </Navbar.Form>
    );
  }
}

export default withRouter(Search);
