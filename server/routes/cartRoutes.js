const router = require('express').Router();
const cartController = require('../controllers/cartController.js');

// carts route
router.post('/add/:listingId/:userId/:quantity', cartController.addToCart);

module.exports = router;