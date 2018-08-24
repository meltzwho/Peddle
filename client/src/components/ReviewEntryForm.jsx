import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import ReactStarRatings from 'react-star-ratings';

class ReviewEntryForm extends Component {
  state = {
    title: '',
    rating: 0,
    description: '',
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = (e) => {
    if (this.props.app.userId) {
      axios.post('/', {
        username: this.props.username,
        title: this.state.title,
        description: this.state.description
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.error(err))
    }
  }
  render() {
    return (
      <Grid>
        <h2 className='text-center'>Share Your Review</h2>
        <Row>
          <Col smOffset={2}>
            <h3>Rate Seller</h3>

          </Col>
        </Row>
        <Row>
          <Form horizontal>
            <Row>
              <FormGroup controlId="title">
                <Col componentClass={ControlLabel} sm={2}>
                    Title
                </Col>
                <Col sm={8}>
                  <FormControl 
                    type="text"
                    name="title"
                    value={this.state.title}
                    placeholder="Enter the title for your review..."
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
            </Row>

            <Row>
              <FormGroup controlId="description">
                <Col componentClass={ControlLabel} sm={2}>
                    Description
                </Col>
                <Col sm={8}>
                  <FormControl 
                    componentClass="textarea"
                    name="description"
                    value={this.state.description}
                    placeholder="Please enter comments here about your experience with this seller."
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
            </Row>

          </Form>
        </Row>
      </Grid>
    );
  }
}

export default ReviewEntryForm;