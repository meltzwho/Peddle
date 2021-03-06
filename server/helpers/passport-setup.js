const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { google } = require('../../config.js');

passport.use(
  new GoogleStrategy({
    // options
    callbackURL: '/auth/google/redirect',
    clientID: google.id,
    clientSecret: google.secret
  }, (accessToken, refreshToken, profile, done) => {
    //callback
    console.log('passport callback fired', profile);
  })
);