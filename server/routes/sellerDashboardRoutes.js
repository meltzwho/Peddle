const sellerDashboardRouter = require('express').Router();
const sellerDashboardController = require('../controllers/sellerDashboardController');

sellerDashboardRouter.post('/tracking', sellerDashboardController.tracking);
sellerDashboardRouter.get('/soldListings', sellerDashboardController.fetchSoldListings);
sellerDashboardRouter.get('/activeListings', sellerDashboardController.fetchActiveListings);
sellerDashboardRouter.get('/inactiveListings', sellerDashboardController.fetchInactiveListings);

module.exports = sellerDashboardRouter;