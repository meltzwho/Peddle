import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Well, Button, Alert } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

class ReviewEntryForm extends Component {
  state = {
    title: '',
    rating: 0,
    description: '',
  }
  componentDidMount() {
    
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
        .then(() => {
          alert("Your post has been created");
        })
        .catch(err => console.error(err))
    }
  }
  changeRating = (newRating) => {
    this.setState({
      rating: newRating
    });
  }
  render() {
    return (
      <Grid>
        <h2 className='text-center'>Share Your Review</h2>
        <Row>
          <Well>
            <Row>
              <Col xs={6} sm={6}>
                <div>SELLER</div>
                {/* <h3>{this.props.list}</h3> */}
              </Col>
              <Col xs={6} sm={6}>
                <div>PRODUCT</div>
                {/* <div>{this.props}</div> */}
              </Col>
            </Row>
          </Well>
        </Row>
        <Row>
          <Col smOffset={2}>
            <h3>Rate Seller</h3>
            <StarRatings
              rating={this.state.rating}
              starRatedColor="gold"
              starHoverColor='rgb(135, 206, 250)'
              changeRating={this.changeRating}
              numberOfStars={5}
              name='rating'
            />
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
                    Comments
                </Col>
                <Col sm={8}>
                  <FormControl
                    componentClass="textarea"
                    name="description"
                    style={{resize: 'vertical', height: '200px'}}
                    value={this.state.description}
                    placeholder="Please enter comments here about your experience with this seller."
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
            </Row>

            <Row className="show-grid">
              <FormGroup>
                <Col smOffset={2} sm={8}>
                  <Button
                    bsStyle="primary"
                    bsSize="large"
                    block
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Submit Feedback
                  </Button>
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