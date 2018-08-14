const AWS = require('aws-sdk');

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
        console.log('photo successfully uploaded', data);
        res.send(data);
      }
    });
  }
}