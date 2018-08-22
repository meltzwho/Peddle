//code in the lambda function on aws

const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01', params: {Bucket: 'peddle-images'}});

exports.handler = (event, context, callback) => {
    let request = JSON.parse(event.body)
    let randoKey = Math.random().toString(36).substring(7);
    let buffer = Buffer.from(request.file.data);
    s3.upload({
        Key: randoKey,
        Body: buffer,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: request.file.mimetype
    }, (err, data) => {
        if (err) {
            console.log(err);
            callback(err)
        } else {
            let response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(data),
                "isBase64Encoded": false
            }
            callback(null, response);
        }
    });
};
