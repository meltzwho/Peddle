const config = require('../../config');
const stripe = require('stripe');

module.exports = {
  getAccount: (req, res) => {
    if (!req.params.stripeId) {
      res.send({
        success: true,
        message: 'Missing stripe account.',
        setupBegan: false
      });
    }
  },
};