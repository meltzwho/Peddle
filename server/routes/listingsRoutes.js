const router = require('express').Router();
const listingsController = require('../controllers/listingsController.js');

// listings route
router.get('/:query', listingsController.getSearchItem);
router.get('/lid/:listingId', listingsController.getListingById);

module.exports = router;