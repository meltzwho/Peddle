import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import './assets/Home.css';

class Home extends React.Component {
  state = {
    index: 0,
    direction: null
  }

  handleSelect = (selectedIndex, e) => {
    console.log('Carousel: ', selectedIndex, e.direction);
  }

  render() {
    const { index, direction } = this.state;

    return (
      // <div className="home-body">
      <Carousel>
        <Carousel.Item>
          <img width={900} height={600} alt="900x600" src="/assets/carousel.jpg" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={900} height={500} alt="900x500" src="/carousel.png" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={900} height={500} alt="900x500" src="/carousel.png" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


        /* <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
          <Carousel.Item>
            <img 
              className="car-photo"
              src="/client/src/components/assets/robots.jpg" 
              width={2000} 
              height={1300} 
              alt="Robots" 
            />
            <Carousel.Caption>
              <h1>Welcome to Peddle!</h1>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel> */
    );
  }
}

export default Home;