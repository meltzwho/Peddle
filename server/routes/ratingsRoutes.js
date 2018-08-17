const router = require('express').Router();
const ratingsController = require('../controllers/ratingsController');

// listings route
router.get('/userId/:userId', ratingsController.getRatingsByUserId);
router.get('/feedback/:userId', ratingsController.getFeedbackByUserId)

module.exports = router;