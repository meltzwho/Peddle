const router = require('express').Router();
const { signupController, setDefaultRating } = require('../controllers/signupController.js');

// signup
router.post('/create', signupController);
router.post('/rating', setDefaultRating);

module.exports = router;