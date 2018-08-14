const router = require('express').Router();
const passport = require('passport');
const { googleController } = require('../controllers/authController.js');
const { googleRedirectController } = require('../controllers/authController.js');

router.get('/google', googleController);

router.get('/auth/google/callback', 
  googleRedirectController);


module.exports = router;