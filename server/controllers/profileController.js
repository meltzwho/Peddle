const db = require('../models/profileModel');

module.exports = {
  fetchUserDetails: (req, res) => {
    db.fetchUserDetails(req.query, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching the user details', err);
      } else {
        res.send(response);
      }
    });
  },
  fetchUserRating: (req, res) => {
    db.fetchUserRating(req.query, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching the user rating', err);
      } else {
        console.log('controller: the response from the db', response);
        res.send(response);
      }
    })
  }
}