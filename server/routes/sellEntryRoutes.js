const sellEntryRouter = require('express').Router();
const sellEntryController = require('../controllers/sellEntryController');

sellEntryRouter.get('/categories', sellEntryController.categories);

sellEntryRouter.post('/newListing', sellEntryController.addListing);

module.exports = sellEntryRouter;