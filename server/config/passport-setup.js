const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { googleConfig } = require('../../config.js');

passport.use(
  new GoogleStrategy({
    // options
    callbackURL: '/auth/google/redirect',
    clientID: googleConfig.google.clientID,
    clientSecret: googleConfig.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    //callback
    console.log('passport callback fired', profile);
  })
);