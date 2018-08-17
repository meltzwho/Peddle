const sellerDashboardRouter = require('express').Router();
const sellerDashboardController = require('../controllers/sellerDashboardController');

sellerDashboardRouter.get('/listings', sellerDashboardController.listings);

module.exports = sellerDashboardRouter;