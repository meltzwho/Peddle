const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
//const {google} = require('./credentials.js');

passport.serializeUser( (user, done) => {
  // TODO
  // implement when the user is placed into the db
  done(null, user.id); 
});

passport.deserializeUser( (id, done) => {

  done(null, id);
  // TODO
  // find user by id from the db
  // implement when the user is placed into the db
  //done(null, user.id);
});

passport.use(
  new BearerStrategy(
    (token, done) => {
      // call database to find token
      return done(null, user, {scope: 'all'});
    
    }
  )
);