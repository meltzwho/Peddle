const imageUploadRouter = require('express').Router();
const imageUploadController = require('../controllers/imageUploadController');

imageUploadRouter.post('/newImage', imageUploadController.newPicture);
imageUploadRouter.post('/listingAndImage', imageUploadController.associateImage);

module.exports = imageUploadRouter;