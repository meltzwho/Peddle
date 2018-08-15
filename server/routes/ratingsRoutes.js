const router = require('express').Router();
const ratingsController = require('../controllers/ratingsController');

// listings route
router.get('/:userId', ratingsController.getRatingsByUserId);

module.exports = router;