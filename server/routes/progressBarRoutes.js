const progressBarRouter = require('express').Router();
const progressBarController = require('../controllers/progressBarController');

progressBarRouter.get('/status', progressBarController.status);

module.exports = progressBarRouter;