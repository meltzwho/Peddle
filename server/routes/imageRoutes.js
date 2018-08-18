const router = require('express').Router();
const imageController = require('../controllers/imageController');

// listings route
router.get('/lid/:listingId', imageController.getImagesByListingId);

module.exports = router;