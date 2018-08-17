import React from 'react';
import {Thumbnail, Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const ListingCard = (props) => {
  var listing = [];
  for (var info in props.listing) {
    listing.push(<p>{info}:{props.listing[info]}</p>)
  }
  return (
    <Link className='test' to={`/listingEntry/${props.listing.id_listing}`}>
      <Thumbnail>
        {/* {listing} */}
        <Image alt='' src={props.listing.images[0] || 'https://pbs.twimg.com/media/CkjFUyTXEAEysBY.jpg'} style={{width: '75%', "marginLeft": "12.5%", height: '35vh', objectFit: "scale-down"}} thumbnail/>
        <ListGroup style={{'textAlign': 'center', "marginTop": '5px'}}>
          <ListGroupItem>{'Title'}: {props.listing.title}</ListGroupItem>
          <ListGroupItem>{'Price'}: ${props.listing.price}</ListGroupItem>
          <ListGroupItem>{'Condition'}: {props.listing.condition.toUpperCase()}</ListGroupItem>
        </ListGroup>
      </Thumbnail>
    </Link>
  );
};

export default ListingCard;