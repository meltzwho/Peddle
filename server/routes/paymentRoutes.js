const router = require('express').Router();
const paymentController = require('../controllers/paymentController.js');

// listings route
router.get('/stripe/id/:stripeId', paymentController.getAccount);

module.exports = router;