const router = require('express').Router();
const { loginController } = require('../controllers/loginController.js');

// login
router.post('/validate', loginController);

module.exports = router;