const router = require('express').Router();
const axios = require('axios');
const config = require('../../config');
const stripe = require('stripe')(config.stripe.stripe_secret_key);

router.get('/auth', (req, res) => res.redirect('https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=ca_DOOjboYDVTZcAZ7WkY4ergfWEwINC0sx&scope=read_write'));

router.get('/', (req, res) => {

  var dataString = `client_secret=${config.stripe.stripe_secret_key}&code=${req.query.code}&grant_type=authorization_code`;

  var options = {
    url: 'https://connect.stripe.com/oauth/token',
    method: 'POST',
    data: dataString
  };

  axios(options)
    .then(res1 => {
      res.cookie('stripe', {stripe_user_id: res1.data.stripe_user_id}, {maxAge: 10000});
      res.redirect('/sellerDashboard');
    });
});

router.post('/', (req, res) => { 
  stripe.charges.create(req.body)
    .then(() => res.end());
});

module.exports = router;