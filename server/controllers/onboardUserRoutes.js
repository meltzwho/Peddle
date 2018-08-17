
const db = require('../models/onboardUserModel.js');

module.exports = {
  
  onboardUserController: (req, res) => {

    db.onboardUser(req.query.id, (err, response) => {
      if (err) {
        console.error('controller: there was an error entering the db', err);
      } else {
        res.status(201).send(response.rows[0]); 
      }
    });
  }
};