
const db = require('../models/signupModel.js');

module.exports = {
  
  signupController: (req, res) => {
    
    db.signupByEmail(req.body.formContents, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(response); 
      }
    });
  },

  setDefaultRating: (req, res) => {
    
    db.setDefaultRating(req.body.ID, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(response); 
      }
    });
  }
};