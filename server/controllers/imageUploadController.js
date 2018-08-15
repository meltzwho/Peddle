const AWS = require('aws-sdk');
const db = require('../models/imageUploadModel');

module.exports = {
  newPicture: (req, res) => {
    const s3 = new AWS.S3({apiVersion: '2006-03-01', params: {Bucket: 'peddle-images'}})
    let randoKey = Math.random().toString(36).substring(7);
    s3.upload({
      Key: randoKey,
      Body: req.files.file.data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: req.files.file.mimetype
    }, (err, data) => {
      if (err) {
        console.error('there was an error uploading this image to s3', err);
      } else {
        res.send(data);
      }
    });
  },
  associateImage: (req, res) => {
    db.associateImage(req.body, (err, response) => {
      if (err) {
        console.error('controller: there was an error associating this image with the listing', err);
      } else {
        res.sendStatus(201);
      }
    });
  }
};