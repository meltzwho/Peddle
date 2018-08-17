const router = require('express').Router();
const { onboardUserController } = require('../controllers/onboardUserController.js');

// signup
router.post('/user', onboardUserController);

module.exports = router;