const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController.js');

// auth login
router.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
});

// auth Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// callback route for google to redirect to 
router.get('/google/redirect', 
  passport.authenticate('google'),
  (req, res) => {
    res.send('you are in callback');
  });

module.exports = router;