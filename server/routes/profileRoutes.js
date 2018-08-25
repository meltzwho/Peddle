const profileRouter = require('express').Router();
const profileController = require('../controllers/profileController');

profileRouter.get('/user', profileController.fetchUserDetails);
profileRouter.get('/rating', profileController.fetchUserRating);
profileRouter.get('/address', profileController.fetchUserAddresses);
profileRouter.put('/updateUser', profileController.updateUser);
profileRouter.put('/updateAddress', profileController.updateAddress);

module.exports = profileRouter;