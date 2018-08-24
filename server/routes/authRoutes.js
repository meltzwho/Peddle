const router = require('express').Router();
const passport = require('passport');
const { googleController } = require('../controllers/authController.js');
const { googleRedirectController } = require('../controllers/authController.js');

// GOOGLE LOGIN

router.get('/google', googleController);

router.get(
  '/google/redirect', 
  googleRedirectController, 
  (req, res) => {
    //console.log('authrts:', req.session);
    res.cookie('user', req.session, { path: '/' });
    res.redirect('/');
  });

module.exports = router;