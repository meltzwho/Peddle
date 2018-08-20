const db = require('../models/cartModel.js');

module.exports = {
  getListingAndPhoto: (req, res) => {
    
    db.getListingAndPhoto(req.query.ID)
      .then(data => {
        //console.log('[controller] fetched listing by id');
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error fetching item by id:', e);
        res.json(data);
      });
  }
};