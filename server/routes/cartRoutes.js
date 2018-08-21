const router = require('express').Router();
const cartController = require('../controllers/cartController.js');

// carts route

router.get('/lookup', cartController.lookup_item_Cart);
router.get('/aggregate', cartController.getListing_Photo_SellerName_By_Id);
router.get('/cartadd', cartController.add_item_to_cart_table);
router.delete('/removefromcart', cartController.remove_from_cart);

module.exports = router;