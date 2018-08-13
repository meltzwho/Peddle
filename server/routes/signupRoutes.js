const router = require('express').Router();
//const passport = require('passport');
const { signupController } = require('../controllers/signupController.js');

console.log('ctrl:',signupController);

// signup
router.post('/create', signupController);


module.exports = router;