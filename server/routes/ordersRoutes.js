const ordersRouter = require('express').Router();
const ordersController = require('../controllers/ordersController');

ordersRouter.get('/orders', ordersController.fetchOrders);
ordersRouter.post('/', ordersController.newOrder);
ordersRouter.post('/completeOrder', ordersController.completeOrder);

module.exports = ordersRouter;