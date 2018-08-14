const router = require('express').Router();
const listingsController = require('../controllers/listingsController.js');

// listings route
router.get('/', listingsController.getSearchItem);

module.exports = router;