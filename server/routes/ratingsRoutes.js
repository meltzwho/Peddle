const router = require('express').Router();
const ratingsController = require('../controllers/ratingsController');

// listings route
router.get('/userId/:userId', ratingsController.getRatingsByUserId);
router.patch('/updateRating', ratingsController.updateRatingBySellerId);
router.get('/feedback/:userId', ratingsController.getFeedbackByUserId);
router.post('/addFeedback/', ratingsController.addFeedback);


module.exports = router;