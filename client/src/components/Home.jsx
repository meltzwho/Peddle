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
              <div className="base-button-wrap">
                <div className="elip-l">
                  <a href="/listings/videogame">
                    <div className="thumb thumb1" />
                  </a>
                </div>
                <div className="elip-l">
                  <a href="/listings/phone">
                    <div className="thumb thumb2" />
                  </a>
                </div>
                <div className="elip-r">
                  <a href="/listings/computers">
                    <div className="thumb thumb3" />
                  </a>
                </div>
                <div className="elip-r">
                  <a href="/listings/headphones">
                    <div className="thumb thumb4" />
                  </a>
                </div>
              </div>
              <a href="/listings/electronics">
                <div className="base-text">
                  Electronics
                </div>
              </a>
            </div>
          </div>

          <div id="group2" className="parallax__group">
            <div className="parallax__layer parallax-base" />
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
            <div className="parallax__layer parallax-base">
              <div className="base-button-wrap">
                <div className="elip-l">
                  <a href="/listings/sheets">
                    <div className="thumb thumb5" />
                  </a>
                </div>
                <div className="elip-l">
                  <a href="/listings/lighting">
                    <div className="thumb thumb6" />
                  </a>
                </div>
                <div className="elip-r">
                  <a href="/listings/furniture">
                    <div className="thumb thumb7" />
                  </a>
                </div>
                <div className="elip-r">
                  <a href="/listings/art">
                    <div className="thumb thumb8" />
                  </a>
                </div>
              </div>
              <a href="/listings/homegoods">
                <div className="base-text">
                  Home Goods
                </div>
              </a>
            </div>
          </div>

          <div id="group4" className="parallax__group">
            <div className="parallax__layer parallax-base" />
            <img
              className=" parallax-background"
              src="/assets/bedroom-clean.jpg"
              alt="Man leaning against a barn playing a banjo."
            />
          </div>

          <div 
            id="group5"
            className="parallax__group"
          >
            <div className="parallax__layer parallax-base">
              <div className="base-button-wrap">
                <div className="elip-l">
                  <a href="/listings/albums">
                    <div className="thumb thumb9" />
                  </a>
                </div>
                <div className="elip-l">
                  <a href="/listings/instruments">
                    <div className="thumb thumb10" />
                  </a>
                </div>
                <div className="elip-r">
                  <a href="/listings/radio">
                    <div className="thumb thumb11" />
                  </a>
                </div>
                <div className="elip-r">
                  <a href="/listings/tickets">
                    <div className="thumb thumb12" />
                  </a>
                </div>
              </div>
              <a href="/listings/music">
                <div className="base-text">
                  Music
                </div>
              </a>
            </div>
          </div>

          <div id="group6" className="parallax__group">
            <div className="parallax__layer parallax-base" />
            <img
              className=" parallax-background"
              src="/assets/man-person-wall-music.jpg"
              alt="Man leaning against a barn playing a banjo."
            />
          </div>

          <div 
            id="group7"
            className="parallax__group"
          >
            <div className="parallax__layer parallax-base">
              <div className="base-button-wrap">
                <div className="elip-l">
                  <a href="/listings/garden">
                    <div className="thumb thumb13" />
                  </a>
                </div>
                <div className="elip-l">
                  <a href="/listings/garden">
                    <div className="thumb thumb14" />
                  </a>
                </div>
                <div className="elip-r">
                  <a href="/listings/garden">
                    <div className="thumb thumb15" />
                  </a>
                </div>
                <div className="elip-r">
                  <a href="/listings/garden">
                    <div className="thumb thumb16" />
                  </a>
                </div>
              </div>
              <a href="/listings/music">
                <div className="base-text">
                  Garden & Outdoors
                </div>
              </a>
            </div>
          </div>

          <div id="group8" className="parallax__group">
            <div className="parallax__layer parallax-base" />
            <img
              className=" parallax-background"
              src="/assets/garden.jpg"
              alt="Long shot of a garden in bloom."
            />
          </div>

          <div 
            id="group9"
            className="parallax__group"
          >
            <div className="parallax__layer parallax-base">
              <div className="base-button-wrap">
                <div className="elip-l">
                  <a href="/">
                    <div className="thumb thumb17" />
                  </a>
                </div>
                <div className="elip-l">
                  <a href="/">
                    <div className="thumb thumb18" />
                  </a>
                </div>
                <div className="elip-r">
                  <a href="/">
                    <div className="thumb thumb19" />
                  </a>
                </div>
                <div className="elip-r">
                  <a href="/">
                    <div className="thumb thumb20" />
                  </a>
                </div>
              </div>
              <a href="/">
                <div className="base-text">
                  Contact Us.
                </div>
              </a>
            </div>
          </div>
            
        </div>
        
      </div>
    );
  }
}

export default Home;