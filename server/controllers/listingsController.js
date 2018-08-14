const db = require('../models/listingsModel.js');

module.exports = {
  getSearchItem: (req, res) => {
    db.getItems()
      .then(data => {
        console.log('controller: listings', data);
        res.json(data)
      })
      .catch(e => {
        console.error('controller: there was an error fetching the items', e);
      });
  }
};