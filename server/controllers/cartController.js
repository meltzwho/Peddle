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
  },
  addToCart: (req, res) => {
    db.addToCart(req.params.listingId, req.params.userId, req.params.quantity)
      .then(() => {
        console.log('[controller] added to cart');
        res.sendStatus(200);
      })
      .catch(e => {
        console.error('[controller] error adding to cart', e);
        res.json(400);
      });
  }
};