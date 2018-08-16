const passport = require('passport');

module.exports = {
  
  googleController: () => {
    console.log('googleController called');
    passport.deserializeUser( (user, done) => {
      console.log('Google deserialize ID:', user.id);
      done(null, user.id);
    });
  }
};
