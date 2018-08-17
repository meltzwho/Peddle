const db = require('../models/progressBarModel');

module.exports = {
  status: (req, res) => {
    db.fetchStatus(req.query, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching this sellers listings', err);
      } else {
        console.log('there response in the server for status', response.data);
        res.send(response.data);
      }
    });
  }
};