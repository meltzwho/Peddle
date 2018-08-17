const router = require('express').Router();
const passport = require('passport');
const { googleController } = require('../controllers/authController.js');
const { googleRedirectController } = require('../controllers/authController.js');

router.get('/google', googleController);

router.get('/google/redirect', 
  googleRedirectController, function(req, res) {
    
    res.cookie('user', req.session, { path: '/' });
    res.redirect('/');
  });


module.exports = router;