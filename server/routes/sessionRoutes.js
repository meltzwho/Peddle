const router = require('express').Router();
const { googleController } = require('../controllers/googleController.js');

// login googleController
router.get('/google', googleController);

module.exports = router;