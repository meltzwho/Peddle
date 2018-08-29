const ordersRouter = require('express').Router();
const ordersController = require('../controllers/ordersController');

ordersRouter.get('/orders', ordersController.fetchOrders);
ordersRouter.post('/', ordersController.newOrder);

module.exports = ordersRouter;