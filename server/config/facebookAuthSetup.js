const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const {facebook} = require('../../config.js');

passport.serializeUser( (user, done) => {
  // TODO
  // implement when the user is placed into the db
  done(null, user.id); 
});

passport.deserializeUser( (id,done) => {

  done(null, id);
  // TODO
  // find user by id from the db
  // implement when the user is placed into the db
  //done(null, user.id);
});

passport.use(
  new FacebookStrategy({
    // options
    callbackURL: '/auth/facebook/redirect',
    clientID: facebook.id,
    clientSecret: facebook.secret
  }, (accessToken, refreshToken, profile, done) => {

    //callback
    console.log('fb-USER: ', profile);
    
    const user = {
      userName: profile.displayName, 
      id: profile.id,
      lastName: profile.name.familyName,
      firstName: profile.name.givenName,
      photos: profile.photos
    };
   
    // TODO
    // check database to see if this user already there

    // then: 
    done(null, user);
  })
);