const router = require('express').Router();
const cartController = require('../controllers/cartController.js');

// carts route
router.get('/lookup', cartController.lookup);
router.get('/aggregate', cartController.aggregateData);
router.put('/update_quantity', cartController.updateQuantity);
router.delete('/removeitem', cartController.removeItem);
router.post('/add/:listingId/:userId/:quantity', cartController.addToCart);

module.exports = router;