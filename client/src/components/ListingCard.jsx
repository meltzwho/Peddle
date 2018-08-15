import React from 'react';
import {Thumbnail, Image, ListGroup, ListGroupItem} from 'react-bootstrap';

const ListingCard = (props) => {
  var listing = [];
  for (var info in props.listing) {
    listing.push(<p>{info}:{props.listing[info]}</p>)
  }
  return (
    <Thumbnail style={{height: "325px"}}>
      {/* {listing} */}
      <Image alt='' src='https://res.cloudinary.com/teepublic/image/private/s--BbHGObwL--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1467290244/production/designs/566209_1.jpg' style={{width: '50%', "margin-left": "25%"}} thumbnail/>
      <ListGroup style={{'textAlign': 'center', margin: '5px'}}>
        <ListGroupItem>{'Title'}: {props.listing.title}</ListGroupItem>
        <ListGroupItem>{'Price'}: ${props.listing.price}</ListGroupItem>
        <ListGroupItem>{'Condition'}: {props.listing.condition.toUpperCase()}</ListGroupItem>

      </ListGroup>
    </Thumbnail>
  );
};

export default ListingCard;