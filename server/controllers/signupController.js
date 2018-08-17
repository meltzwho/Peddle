
const db = require('../models/signupModel.js');

module.exports = {
  
  signupController: (req, res) => {

    db.signupByEmail(req.body.formContents, (err, response) => {
      if (err) {
        console.error('controller: there was an error entering the db', err);
      } else {
        res.status(201).send(response); 
      }
    });
  }
};