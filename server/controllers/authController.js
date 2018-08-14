
const passport = require('passport');

module.exports = {
  
  googleController: passport.authenticate(
    'google'
    , { scope: ['profile', 'email'] }
  ),

  googleRedirectController: passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
  


};
