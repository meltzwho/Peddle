const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {google} = require('../../config.js');

// initiate our application to google
passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: google.id,
      clientSecret: google.secret
    }
    , (accessToken, refreshToken, profile, done) => {
      console.log('accessToken:', accessToken);
      //callback
      console.log('passport callback fired'
        , profile.displayName // username
        , profile.id // googles unique id
        , profile.name.familyName  // lastname
        , profile.name.givenName // firstname
        , profile.photos // an array of photo objects
        , profile.emails[0].value
      );
      const user = {
        userName: profile.displayName, 
        id: profile.id,
        lastName: profile.name.familyName,
        firstName: profile.name.givenName,
        photos: profile.photos,
        email: profile.emails[0].value
      };
      console.log('user:', user);
    
      // TODO
      // check database to see if this user already there

      // then: 
      return done(null, profile);
    })
);

passport.serializeUser( (user, done) => {
  console.log('serialize:', user);
  // TODO
  // implement when the user is placed into the db
  done(null, user); 
});

passport.deserializeUser( (obj, done) => {
  console.log('deserialize:', obj);
  done(null, obj);
  // TODO
  // find user by id from the db
  // implement when the user is placed into the db
  //done(null, user.id);
});