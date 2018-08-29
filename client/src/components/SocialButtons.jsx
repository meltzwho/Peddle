import React from 'react';
import { 
  TwitterButton,
  GooglePlusButton,
  PinterestButton,
  EmailButton
} from 'react-social';

const SocialButtons = () => {
  return (
    <div>
      <TwitterButton url={window.location.href}>Share on Twitter</TwitterButton>
      <GooglePlusButton url={window.location.href}>Share on Google</GooglePlusButton>
      <PinterestButton url={window.location.href}>Share on Pinterest</PinterestButton>
      <EmailButton url={window.location.href}>Share via Email</EmailButton>
    </div>
  );
};

export default SocialButtons;