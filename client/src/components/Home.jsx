import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../../dist/styles/Home.css';

class Home extends React.Component {

  render() {
    let imgRotation = [
      {
        img: '/assets/cute-robots.jpg',
        title: 'Make your life better with a CUTE ROBOT'
      },
      {
        img: '/assets/end-of-summer.jpg',
        title: 'End of Summer Sales'
      },
      {
        img: '/assets/handbags.jpg',
        title: 'Complete your outfit'
      },
      {
        img: '/assets/classic-mens-clothes.jpg',
        title: 'See our curated Mens Wardrobe'
      }
    ];
   
    let carousel = imgRotation.map( item => {
      return (
        <Carousel.Item  
          key={Date.now() * Math.random()}
          className="carousel"
        >
          <img 
            width={1900} 
            height={1200} 
            className="carousel-image" 
            src={item.img} 
            alt="Different shopping categories"
          />
          <Carousel.Caption>
            <h3>{item.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });

    
    return (
      <div className="home-wrapper">
        
        <div className="parallax">
          <Carousel>
            {carousel}
          </Carousel>

          <div 
            id="group1"
            className="parallax__group"
          >
            <div className="parallax__layer parallax-base">
              <div className="base1-text">
                Electronics
              </div>
            </div>
          </div>

          <div 
            id="group2"
            className="parallax__group"
          >
            
            <div 
              className="parallax__layer parallax-base"
            />
            
            <img
              className=" parallax-background"
              src="/assets/electronics-1.jpg"
              alt="table full of assorted electronic gadgets"
            />
            
          </div>

          <div 
            id="group3"
            className="parallax__group"
          >
            <div 
              className="parallax__layer parallax-base"
            />
          </div>

          <div 
            id="group4"
            className="parallax__group"
          >
            <div 
              className="parallax__layer parallax-base"
            />
            <img
              className=" parallax-background"
              src="/assets/man-person-wall-music.jpg"
              alt="Man leaning against a barn playing a banjo."
            />
          </div>

          <div 
            id="group5"
            className="parallax__group"
          >
            <div 
              id
              className="parallax__layer parallax-base"
            >
              Music
            </div>
          </div>

          <div 
            id="group6"
            className="parallax__group"
          >
            <div 
              className="parallax__layer parallax-base"
            />
            <img
              className=" parallax-background"
              src="/assets/bedroom-clean.jpg"
              alt="Man leaning against a barn playing a banjo."
            />
          </div>

          <div 
            id="group7"
            className="parallax__group"
          >
            <div 
              className="parallax__layer parallax-base"
            >
              Home Goods
            </div>
          </div>
            
        </div>
        
      </div>
    );
  }
}

export default Home;