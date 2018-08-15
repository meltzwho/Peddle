const db = require('../models/ratingsModel');

module.exports = {
  getRatingsByUserId: (req, res) => {
    db.getRatingsByUserId(req.params.userId)
      .then(data => {
        console.log('controller: user rating fetched');
        res.status(200).json(data);
      })
      .catch(e => {
        console.error('controller: error fetching user rating', e);
        res.status(400).json(e);
      });
  }
};