const db = require('../models/cartModel.js');

module.exports = {

  aggregateData: (req, res) => {
    
    db.aggregateData(req.query.ID)
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error fetching item by id:', e);
        res.json(data);
      });
  },

  removeItem: (req, res) => {
    db.removeItem(req.body.ID)
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error deleting item to cart table:', e);
        res.json(data);
      });
  },

  updateQuantity: (req, res) => {
    db.updateQuantity(req.body.ID, req.body.quantity)
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error looking up item to cart table:', e);
        res.json(data);
      });
  },

  addToCart: (req, res) => {
    db.addToCart(req.params.listingId, req.params.userId, req.params.quantity)
      .then((res1) => {
        console.log('[controller] added to cart');
        res.sendStatus(200);
      })
      .catch(e => {
        console.error('[controller] error looking up item to cart table:', e);
        res.json(data);
      });
  },

  lookup: (req, res) => {
    
    db.lookup(req.query.ID)
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error looking up item to cart table:', e);
        res.json(data);
      });
  }

};