import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

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
        title: this.state.type,
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
      <div>
        <Row>
          <Col xs={12} sm={12} className="main-section">
            <h2>Share Your Review</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} className="main-section">
            <Form>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ReviewEntryForm;