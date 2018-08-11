const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {google} = require('./google-credentials.js');

passport.use(
  new GoogleStrategy({
    // options
    callbackURL: '/auth/google/redirect',
    clientID: google.clientID,
    clientSecret: google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    //callback
    console.log('passport callback fired', profile)
})
);