const config = require('../../config');

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