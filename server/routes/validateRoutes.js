const router = require('express').Router();
const { validateController } = require('../controllers/validateController.js');


// signup
router.post('/token', validateController);

module.exports = router;