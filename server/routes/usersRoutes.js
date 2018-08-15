const router = require('express').Router();
const usersController = require('../controllers/usersController.js');

// listings route
router.get('/:id', usersController.getUserById);

module.exports = router;