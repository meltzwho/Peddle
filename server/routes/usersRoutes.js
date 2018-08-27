const router = require('express').Router();
const usersController = require('../controllers/usersController.js');

// listings route
router.get('/userId/:id', usersController.getUserById);
router.post('/stripe', usersController.userToSeller);

module.exports = router;