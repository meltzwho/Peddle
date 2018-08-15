import React from 'react';
import {Thumbnail} from 'react-bootstrap';
const ListingCard = (props) => {
  var listing = [];
  for (var info in props.listing) {
    listing.push(<p>{info}:{props.listing[info]}</p>)
  }
  return (
    <div style={{border: "thin solid black"}}>
      {listing}
    </div>
  );
};

export default ListingCard;