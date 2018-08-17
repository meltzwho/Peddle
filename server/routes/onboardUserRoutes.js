const router = require('express').Router();
const { onboardUserController } = require('../controllers/onboardUserController.js');

// signup
router.get('/user', onboardUserController);

module.exports = router;