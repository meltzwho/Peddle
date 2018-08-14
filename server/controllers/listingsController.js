const db = require('../models/sellEntryModel.js');

module.exports = {
  getSearchItem: (req, res) => {
    db.getSearchItem()
      .then(data => {
        console.log('controller: listings', data);
      })
      .catch(e => {
        console.error('controller: there was an error fetching the items', e);
      });
    }
}