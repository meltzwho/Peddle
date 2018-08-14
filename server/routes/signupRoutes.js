const router = require('express').Router();
const { signupController } = require('../controllers/signupController.js');

// signup
router.post('/create', signupController);

module.exports = router;