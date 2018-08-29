const sellerDashboardRouter = require('express').Router();
const sellerDashboardController = require('../controllers/sellerDashboardController');

sellerDashboardRouter.get('/listings', sellerDashboardController.listings);
sellerDashboardRouter.post('/tracking', sellerDashboardController.tracking);
sellerDashboardRouter.get('/soldListings', sellerDashboardController.fetchSoldListings);
sellerDashboardRouter.get('/activeListings', sellerDashboardController.fetchActiveListings);

module.exports = sellerDashboardRouter;