const imageUploadRouter = require('express').Router();
const imageUploadController = require('../controllers/imageUploadController');

imageUploadRouter.post('/newImage', imageUploadController.newPicture);

module.exports = imageUploadRouter;