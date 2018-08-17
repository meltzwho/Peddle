const sellEntryRouter = require('express').Router();
const sellEntryController = require('../controllers/sellEntryController');

sellEntryRouter.get('/categories', sellEntryController.categories);

sellEntryRouter.post('/newListing', sellEntryController.addListing);

sellEntryRouter.post('/associateAddress', sellEntryController.addAddress);

sellEntryRouter.post('/editListing', sellEntryController.editListing);

module.exports = sellEntryRouter;