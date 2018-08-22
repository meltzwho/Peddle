const router = require('express').Router();
const cartController = require('../controllers/cartController.js');

// carts route

router.get('/lookup', cartController.lookup);
router.get('/aggregate', cartController.getListing_Photo_SellerName_By_Id);
router.get('/increment', cartController.increment);
router.get('/decrement', cartController.decrement);
router.delete('/removefromcart', cartController.remove_from_cart);

module.exports = router;