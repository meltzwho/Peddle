import React from 'react';
import { 
  TwitterButton,
  GooglePlusButton,
  PinterestButton,
  EmailButton
} from 'react-social';
import { Grid, Col, Row } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

const SocialButtons = () => {
  return (
    <div>
      <Col>
        <TwitterButton
          url={window.location.href}
          className="socialButtons"
        >
          <Image src="/assets/socialMedia/twitter.png" height="30px" width="30px" />
        </TwitterButton>
        <GooglePlusButton
          url={window.location.href}
          className="socialButtons"
        >
          <Image src="/assets/socialMedia/google-plus.png" height="30px" width="30px" />
        </GooglePlusButton>
        <PinterestButton
          url={window.location.href}
          message="Look what I found on Peddle"
          className="socialButtons"
        >
          <Image src="/assets/socialMedia/pinterest.png" height="30px" width="30px" />
        </PinterestButton>
        <EmailButton
          url={window.location.href}
          className="socialButtons"
        >
          <Image src="/assets/socialMedia/email.png" height="30px" width="30px" />
        </EmailButton>
      </Col>
    </div>
  );
};

export default SocialButtons;