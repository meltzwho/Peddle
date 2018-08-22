const profileRouter = require('express').Router();
const profileController = require('../controllers/profileController');

profileRouter.get('/user', profileController.fetchUserDetails);
profileRouter.get('/rating', profileController.fetchUserRating);

module.exports = profileRouter;