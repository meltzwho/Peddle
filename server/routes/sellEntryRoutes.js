const sellEntryRouter = require('express').Router();
const sellEntryController = require('../controllers/sellEntryController');

sellEntryRouter.get('/categories', sellEntryController.categories);

module.exports = sellEntryRouter;