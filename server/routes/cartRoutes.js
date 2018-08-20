const router = require('express').Router();
const { getListingAndPhoto } = require('../controllers/cartController.js');

// carts route
router.get('/listingandphoto', getListingAndPhoto);

module.exports = router;