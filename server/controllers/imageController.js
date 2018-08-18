const db = require('../models/imageModel');

module.exports = {
  getImagesByListingId: (req, res) => {
    db.getImagesByListingId(req.params.listingId)
      .then(data => {
        console.log('[controller] fetched images by listing id');
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error fetching images by listing id', e);
      });
  }
};