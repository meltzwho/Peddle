const router = require('express').Router();
const passport = require('passport');
const Cookies = require('universal-cookie');
const { googleController } = require('../controllers/authController.js');
const { googleRedirectController } = require('../controllers/authController.js');

router.get('/google', googleController);

router.get('/google/redirect', 
  googleRedirectController, function(req, res) {
    console.log('req', req.user);
    const cookies = new Cookies(req.headers.cookie);
    cookies.set('gkookie', req.user, {path: '/'});
    // Successful authentication, redirect home.
    // res.user = {user: req.user};
    // res.setHeader('Set-Cookie', ['gcookie', req.user]);   
    res.redirect('/');
  });


module.exports = router;