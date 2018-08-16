const db = require('../models/listingsModel.js');

module.exports = {
  getSearchItem: (req, res) => {
    db.getItems()
      .then(data => {
        console.log('[controller] fetched listings');
        res.json(data)
      })
      .catch(e => {
        console.error('[controller] error fetching items', e);
      });
  },
  getListingById: (req, res) => {
    db.getListingById(req.params.listingId)
      .then(data => {
        console.log('[controller] fetched listing by id');
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error fetching item by id:', e);
        res.json(data);
      });
  }
};