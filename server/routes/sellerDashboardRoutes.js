const sellerDashboardRouter = require('express').Router();
const sellerDashboardController = require('../controllers/sellerDashboardController');

sellerDashboardRouter.get('/listings', sellerDashboardController.listings);
sellerDashboardRouter.post('/tracking', sellerDashboardController.tracking);

module.exports = sellerDashboardRouter;