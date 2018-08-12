
const router = require('express').Router();
const passport = require('passport');
const Redirect = require('react-router-dom').Redirect;

// auth login
router.get('/login', (req, res) => {
  res.render('login', {user: req.user});
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  req.logout();
  res.redirect('/');
});

// auth Bearer
router.get(
  '/bearer'
  , passport.authenticate(
    'bearer'
    , {session: false}
    , (req, res) => {
      res.json(req.user);
    }
  )
);

// auth Google
router.get(
  '/google'
  , passport.authenticate(
    'google'
    , {scope: ['profile']}
  )
);

// auth Facebook
router.get(
  '/facebook'
  , passport.authenticate(
    'facebook'
    , {scope: ['read_stream', 'publish_actions']}
  )
);

// callback route for google to redirect to 
router.get(
  '/google/redirect'
  , passport.authenticate('google') 
  , (req, res) => {
    
    res.redirect('/notifications'); // send where????????????
  });

// callback route for facebook to redirect to 
router.get(
  '/facebook/redirect'
  , passport.authenticate('facebook') 
  , (req, res) => {
   
    res.redirect('/listings'); // send where????????????
  });

module.exports = router;